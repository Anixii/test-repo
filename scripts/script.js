import { searchController } from "./searchController.js"
import { loadJson } from "./loadJson.js";
import { createListElements } from "./createListElements.js";


const charctersURL = new URL("https://rickandmortyapi.com/api/character/?name=&species=&gender=&status=&page=1");

const pageIndicators = [...document.getElementsByClassName("current-page")];
const searchControl = new searchController(charctersURL,pageIndicators);

const charcterList = document.getElementById('charcterList');
document.addEventListener("DOMContentLoaded", search(searchControl));



function search(searchControl) {
    if(charcterList.children.length > 0)
        charcterList.innerHTML = "";
    if(searchControl.filterIsOn())
        resetBtn.classList.add("active");

    loadJson(searchControl.getSearchUrl())
    .then(json => {
        createListElements(json.results,"pages/charcterPage.html");
        return json
    })
    .then(json => {
        const {info: {pages}} = json;
        searchControl.setLastPage(pages);
    })
    .catch(err => {
        charcterList.innerHTML = "";
        let div = document.createElement("div");
        div.innerHTML = `"${searchControl.get("name")}" - Такого персонажа нету! (${err})`;
        div.classList = "error";
        charcterList.append(div);
    })
};





const input = document.getElementById("input");
input.addEventListener("input", (event) => {
    searchControl.setSearchFilter("name", event.target.value);
    searchControl.firstPage();
    search(searchControl);
});

const filters = document.querySelectorAll(".filter")
filters.forEach(filter => filter.addEventListener('change', selectChange))
function selectChange(event) {
    let filterName = event.target.name;
    let filterValue = event.target.value;
    searchControl.setSearchFilter(filterName, filterValue);
    searchControl.firstPage();
    search(searchControl);
};


const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", () => {
    filters.forEach(filter => filter.value = "");
    input.value = "";
    searchControl.resetFilters();
    search(searchControl);
    resetBtn.classList.remove("active");
});



const firstPageBtn = [...document.getElementsByClassName("on-first-page-btn")].forEach(btn => 
    btn.addEventListener("click", () => {
        searchControl.firstPage();
        search(searchControl);
    }));
const nextPageBtn = [...document.getElementsByClassName("on-next-page-btn")].forEach(btn => 
    btn.addEventListener("click", () => {
        searchControl.nextPage();
        search(searchControl);
    }));
const prevPageBtn = [...document.getElementsByClassName("on-prev-page-btn")].forEach(btn => 
    btn.addEventListener("click", () => {
        searchControl.prevPage();
        search(searchControl);
    }));
const lastPageBtn = [...document.getElementsByClassName("on-last-page-btn")].forEach(btn => 
    btn.addEventListener("click", () => {
        searchControl.lastlastPage();
        search(searchControl);
    }));

















