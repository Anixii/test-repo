export function getIds(URLs) {
    const idArray = [];
    for(let i = 0; i < URLs.length; i++) {
        let id = URLs[i].match(/\/(\d+)$/);
        if(id === null)
            continue;
        console.log(id[1])
        idArray.push(id[1]);
    }
    return idArray;
}