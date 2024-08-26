import { processServerResponse } from "./processserver";
const baseUrl = "http://localhost:3001";
console.log(baseUrl);

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

async function addNewItem(name, link, weather) {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      link,
      weather,
    }),
  }).then(processServerResponse);
}

function deleteItemById(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  }).then(processServerResponse);
}

export { getItems, addNewItem, deleteItemById };
