import { getHeros, getHero, updateHero, deleteHero, setHero, searchHeros } from "./js/service.js";

const form = document.getElementById("crud-form");
const title = document.getElementById("crud-title");
const divHeros = document.getElementById("heros");
const divSearch = document.getElementById("search");

const searchHero = document.getElementById("input-search")

document.addEventListener("DOMContentLoaded", getHeros);

document.addEventListener("submit", (event) => {

    if (event.target === form) {
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
                updateHero(hero)
            } catch (error) {
                let message = error.statusText || "Ocurrió un error al cargar";
                form.insertAdjacentHTML("afterend", `<p><b>Error${error.status}: ${message}</b></p>`);
            }
        }
    }
})

document.addEventListener("click", (event) => {

    if (event.target.matches("#edit")) {


        title.textContent = "Editar Heroe";
        form.alias.value = event.target.dataset.alias;
        form.name.value = event.target.dataset.name;
        form.power.value = event.target.dataset.power;
        form.isAlive.value = event.target.dataset.isAlive;
        form.id.value = event.target.dataset.id;
        form.link.value = event.target.dataset.link;

        form.style.display = "inline";
        divHeros.style.display = "none";
        divSearch.style.display = "none";
    }

    if (event.target.matches("#delete")) {

        let isDelete = confirm(`¿Desea eliminar el heroe: ${event.target.dataset.alias}`);
        if (isDelete) {
            try {
                deleteHero(event.target.dataset.value)
            } catch (error) {
                let message = error.statusText || "Ocurrió un error al cargar";
                alert(`Error${error.status}: ${message}`);
            }
        }
    }

    if (event.target.matches("#navbar-home")) {
        divHeros.style.display = "inline";
        form.style.display = "none";
        divSearch.style.display = "none";
    }

    if (event.target.matches("#navbar-add")) {
        form.style.display = "inline";
        divHeros.style.display = "none";
        divSearch.style.display = "none";
    }

    if (event.target.matches("#btn-search")) {
        divSearch.style.display = "inline";
        form.style.display = "none";
        divHeros.style.display = "none"

        try {
            searchHeros(searchHero.value)
        } catch (error) {
            let message = error.statusText || "Ocurrió un error al cargar";
            form.insertAdjacentHTML("afterend", `<p><b>Error${error.status}: ${message}</b></p>`);
        }

    }

})


