import { loadJson } from "./loadJson.js";
import { getIds } from "./getIds.js";

const charcterUrl = new URL("https://rickandmortyapi.com/api/character/");
const episodeUrl = new URL("https://rickandmortyapi.com/api/episode/")
const searchParams = new URLSearchParams(window.location.search);

loadJson(charcterUrl.toString() + searchParams.get("id"))
.then(json => {
    insertInfo(json);
    return json;
})
.then(json => {
    let {episode} = json;
    const episodesId = getIds(episode);
    loadJson(episodeUrl.toString() + episodesId)
    .then(json => {
        if(episodesId.length == 1)
            insertEpisode(json);
        else
            json.forEach(element => insertEpisode(element))
    })
})
 





function insertInfo(json) {
    let {image, name, status, species, type, gender, origin: {name: origin}, location: {name: location}} = json;
    document.getElementById("charcterImage").src = image;
    document.getElementById("charcterName").innerHTML = name;
    document.getElementById("genderValue").innerHTML = gender;
    document.getElementById("statusValue").innerHTML = status;
    document.getElementById("specieValue").innerHTML = species;
    document.getElementById("originValue").innerHTML = origin;
    document.getElementById("typeValue").innerHTML = type;
    if(type === "")
        document.getElementById("typeValue").innerHTML = "Unknown";
    document.getElementById("locationValue").innerHTML = location;
}



function insertEpisode(json) {
    let {name, air_date, episode} = json;
    let episodesList = document.getElementById("episodesList");
    let episodeInfoContainer = document.createElement("a");
    episodeInfoContainer.classList.add("infoContainer-list_element");
    episodesList.append(episodeInfoContainer);

    let arrow = document.createElement("img");
    arrow.classList.add("arrow");
    arrow.src = "../img/arrow.svg";
    episodeInfoContainer.append(arrow);

    let episodeCode = document.createElement("p");
    episodeCode.classList.add("subtitle");
    episodeCode.innerHTML = episode;
    episodeInfoContainer.append(episodeCode);

    let episodeName = document.createElement("p");
    episodeName.classList.add("secondary-text");
    episodeName.innerHTML = name;
    episodeInfoContainer.append(episodeName);

    let episodeAirDate = document.createElement("p");
    episodeAirDate.classList.add("overline");
    episodeAirDate.innerHTML = air_date;
    episodeInfoContainer.append(episodeAirDate);
}