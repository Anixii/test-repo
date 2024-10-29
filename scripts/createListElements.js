export function createListElements(json,href) {
    if(json.length === undefined) {
        createListElement(json, href)
    } else {
        json.forEach(element => {
        createListElement(element, href)
        });
    }
}

function createListElement(json,href) {
    const {name, species, image, id} = json;

        let charcter = document.createElement('a');
        charcter.classList = "charcter-list__element";
        charcter.href = `${href}?id=${id}`
        charcterList.append(charcter);
    
        let characterIMG = document.createElement("img");
        characterIMG.src = image;
        characterIMG.classList = "charcter-list__element_img";
        charcter.append(characterIMG);
    
        let charcterINFO = document.createElement('div');
        charcterINFO.classList = "charcter-list__element_info";
        charcter.append(charcterINFO);
    
        let charcterNAME = document.createElement('p');
        charcterNAME.classList = "charcter-list__element_name";
        charcterNAME.append(name);
        charcterINFO.append(charcterNAME);
    
        let charcterSPECIES = document.createElement("p");
        charcterSPECIES.classList = "charcter-list__element_race";
        charcterSPECIES.append(species);
        charcterINFO.append(charcterSPECIES);
}