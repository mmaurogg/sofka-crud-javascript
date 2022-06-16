const template = document.querySelector("#crud-template").content;
const fragment = document.createDocumentFragment();

let arrHeros = [];
let herosFilter = [];

/**
 * Método para descargar y mostrar en la página la informacion de los heroes de la API
 */
const getHeros = () => {
    fetch("http://localhost:3000/marvel")
    .then((res) => {
        return (res.ok)?res.json():Promise.reject(res);
    })
    .then((json) => {
        arrHeros = json;

        const cards = buildPage(json)

        document.getElementById("heros").appendChild(cards);

    })
    .catch((error) => {
        let message = error.statusText || "Ocurrió un error al cargar";
        alert(`Error ${error.status}: ${message}`);
    })
}

/**
 * Método para descargar y mostrar en la página la informacion de un heroe de la API
 * @param {*} id numero identificador id del heroe buscado
 */
const getHero = async (id)=> {
    await fetch(`http://localhost:3000/marvel/${id}`)
    .then((res) => {
        return (res.ok)?res.json():Promise.reject(res);
    })
    .then((json) =>{

        buildPage(json)
    })
    .catch((error) => {
        let message = error.statusText || "Ocurrió un error al cargar";
        table.insertRow("afterend", `<p><b>Error${error.status}:${message}</b></p>`);
    })
}

/**
 * Método para borrar la un heroe de la API
 * @param {*} id numero identificador id del heroe buscado
 */
const deleteHero = async (id) => {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
    }
    
    let res = await fetch(`http://localhost:3000/marvel/${id}`, options);
    
    if(!res.ok) throw new Error({ status: res.status, statusText: res.statusText});
    
    location.reload();

}

/**
 * Método añadir un heroe nuevo a la API
 * @param {*} hero información del heroe en formato json
 */
const setHero = async (hero) => {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            alias: hero.alias.value,
            name: hero.name.value,
            power: hero.power.value,
            link: hero.link.value
        })
    }
    
    let res = await fetch(`http://localhost:3000/marvel`, options);
    
    if(!res.ok) throw new Error({ status: res.status, statusText: res.statusText});

    location.reload();
}


/**
 * Método para actualziar el heroe en la API
 * @param {*} hero información del heroe en formato json
 */
const updateHero = async (hero) => {

    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            alias: hero.alias.value,
            name: hero.name.value,
            power: hero.power.value,
            link: hero.link.value
        })
    }
    
    let res = await fetch(`http://localhost:3000/marvel/${hero.id.value}`, options);
    
    if(!res.ok) throw new Error({ status: res.status, statusText: res.statusText});

    location.reload();
}

/**
 * Método para buscar y mostrar en la página un heroe de la API
 * @param {*} search palabra buscada en la información de heroes
 */
const searchHeros = (search) => {

    filtrarHeroes(search);

    const cards = buildPage(herosFilter)
    console.log(cards);
    document.getElementById("search").replaceChildren(cards);
    console.log(herosFilter);

}

/**
 * Método para filtrar los heroes de la API y agregarlos en el array de herosFilter
 * @param {*} search palabra buscada en la información de heroes
 */
const filtrarHeroes = (search) => {

    herosFilter = [];
    search = search.toLocaleLowerCase();

    arrHeros.forEach(element => {
        const aliasLower = element.alias.toLocaleLowerCase();
        const nameLower = element.name.toLocaleLowerCase();

        if (aliasLower.indexOf(search) >= 0 || nameLower.indexOf(search) >= 0) {
            herosFilter.push(element);
        }
    });
}

/**
 * Método para construir los elementos html dle heroe para mostrar en la página
 * @param {*} heros array compuesta por varios heroes
 * @returns elementos html de heroes para ser agregados a un elemento en la página
 */
let buildPage = (heros) => {

    const unknownImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    heros.forEach(element => { 
        template.getElementById("alias").textContent = element.alias;
        template.getElementById("name").textContent = element.name;
        template.getElementById("power").textContent = element.power;
        template.getElementById("isAlive").textContent = "pendiente";
        template.getElementById("link").src = element.link || unknownImage;
        
        template.getElementById("edit").dataset.alias = element.alias;
        template.getElementById("edit").dataset.name = element.name;
        template.getElementById("edit").dataset.power = element.power;
        template.getElementById("edit").dataset.isAlive = element.isAlive;
        template.getElementById("edit").dataset.id = element.id;
        template.getElementById("edit").dataset.link = element.link;
        
        template.getElementById("delete").dataset.value = element.id;

        let clone = document.importNode(template,true);
        fragment.append(clone);
    });

    const cards = document.createElement("div");
    cards.className = "row row-cols-1 row-cols-md-3 g-4";
    cards.id = "cards";

    cards.append(fragment);
    
    return cards;
}

export {getHeros, getHero, updateHero, deleteHero, setHero, searchHeros};