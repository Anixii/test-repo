export async function loadJson(url) {
    let response = await fetch(url);
    if(response.status == 200) {
        let responseJSON = await response.json();
        return responseJSON
    }
    throw new Error(`Не найдено`);
};