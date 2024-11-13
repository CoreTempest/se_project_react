import { processServerResponse } from "./processserver";

export const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error:${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(processServerResponse);
}

async function addNewItem(name, imageUrl, weather) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageUrl,
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

export { getItems, addNewItem, deleteItemById, checkResponse };
