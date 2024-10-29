import { createListElements } from './createListElements.js';
import { loadJson } from './loadJson.js';
import { searchController } from './searchController.js';
import { getIds } from './getIds.js';

const charctersUrl = new URL('https://rickandmortyapi.com/api/character/');
const locationsUrl = new URL('https://rickandmortyapi.com/api/location/');
const searchParams = new URLSearchParams(window.location.search);
document.addEventListener('DOMContentLoaded', search());

function search() {
  loadJson(locationsUrl.toString() + searchParams.get('id'))
    .then((json) => {
      let { name, type, dimension } = json;
      document.getElementById('name').innerHTML = name;
      document.getElementById('type').innerHTML = type;
      document.getElementById('dimension').innerHTML = dimension;
      return json;
    })
    .then((json) => {
      let { residents } = json;
      let residentsId = getIds(residents);
      loadJson(charctersUrl.toString() + residentsId).then((json) =>
        createListElements(json, 'charcterPage.html')
      );
    });
}
