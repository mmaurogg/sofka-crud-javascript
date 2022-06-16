const template = document.querySelector("#crud-template").content;
const fragment = document.createDocumentFragment();

let arrHeros = [];
let herosFilter = [];

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

//getHero
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


//deleteHero
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

//setHero
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


//UpdatHero
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

//_-------------

const searchHeros = (search) => {

    filtrarHeroes(search);

    const cards = buildPage(herosFilter)
    console.log(cards);
    document.getElementById("search").replaceChildren(cards);
    console.log(herosFilter);

}

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