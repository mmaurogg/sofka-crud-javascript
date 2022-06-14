const table = document.getElementById("crud-table");
const template = document.getElementById("crud-template").content;
const fragment = document.createDocumentFragment();

const getHeros = async () => {
    await fetch("http://localhost:3000/marvel")
    .then((res) => {
        return (res.ok)?res.json():Promise.reject(res);
    })
    .then((json) =>{

        json.forEach(element => { 

            template.getElementById("alias").textContent = element.alias;
            template.getElementById("name").textContent = element.name;
            template.getElementById("power").textContent = element.power;
            template.getElementById("isAlive").textContent = "pendiente";
            template.getElementById("edit").dataset.alias = element.alias;
            template.getElementById("edit").dataset.name = element.name;
            template.getElementById("edit").dataset.power = element.power;
            template.getElementById("edit").dataset.isAlive = element.isAlive;
            template.getElementById("edit").dataset.id = element.id;

            let clone = document.importNode(template,true);
            fragment.appendChild(clone);
        });

        document.getElementById("body-table").appendChild(fragment);
    })
    .catch((error) => {
        let message = error.statusText || "Ocurrió un error al cargar";
        table.insertRow("afterend", `<p><b>Error${error.status}:${message}</b></p>`);
    })
}

//getHero
const getHero = async (id)=> {
    await fetch(`http://localhost:3000/marvel/${id}`)
    .then((res) => {
        return (res.ok)?res.json():Promise.reject(res);
    })
    .then((json) =>{

        json.forEach(element => { 

            template.getElementById("alias").textContent = element.alias;
            template.getElementById("name").textContent = element.name;
            template.getElementById("power").textContent = element.power;
            template.getElementById("isAlive").textContent = "pendiente";


            let clone = document.importNode(template,true);
            fragment.appendChild(clone);
        });

        document.getElementById("body-table").appendChild(fragment);
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
    
    if(!res.ok) throw { status: res.status, statusText: res.statusText};
    
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
            power: hero.power.value
        })
    }
    
    let res = await fetch(`http://localhost:3000/marvel`, options);
    
    if(!res.ok) throw { status: res.status, statusText: res.statusText};

    location.reload();
}


//UpdatHero
const updatHero = async (hero) => {
    event.preventDefault()
    console.log("Hola mundo");
    let options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            alias: hero.alias.value,
            name: hero.name.value,
            power: hero.power.value
        })
    }
    
    let res = await fetch(`http://localhost:3000/marvel/${hero.id.value}`, options);
    
    if(!res.ok) throw { status: res.status, statusText: res.statusText};

    location.reload();
}

export {getHeros, getHero, updatHero, deleteHero, setHero};