import { searchController } from "./searchController.js";
import { loadJson } from "./loadJson.js";

const locationsList = document.getElementById("locationsList");
const locationsUrl = new URL("https://rickandmortyapi.com/api/location/?name=&type=&dimension=&page=&");
const searchControl = new searchController(locationsUrl);
document.addEventListener("DOMContentLoaded", search(searchControl));




function search(searchControl) {
    if(locationsList.children.length > 0)
        locationsList.innerHTML = "";
    if(searchControl.filterIsOn())
        resetBtn.classList.add("active");
    
    loadJson(searchControl.getSearchUrl())
    .then(json => {
        json.results.forEach(location => createLocation(location))
        searchControl.setLastPage("page", json.info.pages);
        searchControl.firstPage();
        console.log("search compl");
    })
}


const loadmoreBtn = document.getElementById("loadmoreBtn");
loadmoreBtn.addEventListener("click",() => loadMore(searchControl));


function loadMore(searchControl) {
    searchControl.nextPage();
    loadJson(searchControl.getSearchUrl())
    .then(json => {
        json.results.forEach(location => createLocation(location))
        console.log("loadmore compl")
    })
    
}



const input = document.getElementById("input");
input.addEventListener("input", (event) => {
    searchControl.setSearchFilter("name", event.target.value);
    search(searchControl);
});

const filters = document.querySelectorAll(".filter")
filters.forEach(filter => filter.addEventListener('change', selectChange))
function selectChange(event) {
    let filterName = event.target.name;
    let filterValue = event.target.value;
    searchControl.setSearchFilter(filterName, filterValue);
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

function createLocation(json) {
    let {name, type, id} = json;

    let locationInfoContainer = document.createElement("a");
    locationInfoContainer.classList.add("loactions-list__list-element");
    locationInfoContainer.href = `./locationPage.html?id=${id}`
    locationsList.append(locationInfoContainer);

    let locationName = document.createElement("p");
    locationName.classList.add("list-element_name")
    locationName.innerHTML = name;
    locationInfoContainer.append(locationName);

    let locationType = document.createElement("p");
    locationType.classList.add("list-element_type");
    locationType.innerHTML = type;
    locationInfoContainer.append(locationType);
}