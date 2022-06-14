import {getHeros, getHero, updatHero, deleteHero, setHero} from "./service.js";

const form = document.getElementById("crud-form");
const title = document.getElementById("crud-title");


document.addEventListener("DOMContentLoaded", getHeros);

document.addEventListener("submit", (event) => {

    if(event.target === form){
        let hero = event.target;
        event.preventDefault()

        if (!event.target.id.value) {
            
            try {
                setHero(hero);
            } catch (error) {
                let message = error.statusText || "Ocurrió un error al cargar";
                form.insertAdjacentHTML("afterend", `<p><b>Error${error.status}: ${message}</b></p>`);
            }
            
        } else {
            try {
                updatHero(hero)
            } catch (error) {
                let message = error.statusText || "Ocurrió un error al cargar";
                form.insertAdjacentHTML("afterend", `<p><b>Error${error.status}: ${message}</b></p>`);
            }
        }
    } 
})

document.addEventListener("click", (event) =>{
    if(event.target.matches("#edit")){
        
        title.textContent = "Editar Heroe";
        form.alias.value = event.target.dataset.alias;
        form.name.value = event.target.dataset.name;
        form.power.value = event.target.dataset.power;
        form.isAlive.value = event.target.dataset.isAlive;
        form.id.value = event.target.dataset.id;

        console.log(event.target.dataset.id)
    }

    if(event.target.matches("#delete")) {
        let isDelete = confirm(`¿Desea eliminar el heroe: ${event.target.dataset.alias}`);
        
        if(isDelete){
            try {
                deleteHero(event.target.value)
            } catch (error) {
                let message = error.statusText || "Ocurrió un error al cargar";
                alert(`Error${error.status}: ${message}`);
            }
        }
    }
})
