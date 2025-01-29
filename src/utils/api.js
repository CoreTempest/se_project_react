import { processServerResponse } from "./processserver";

import { BASE_URL } from "../utils/constants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error:${res.status}`);
}

function getItems() {
  return fetch(`${BASE_URL}/items`).then(processServerResponse);
}

async function addNewItem(name, imageUrl, weather) {
  const token = localStorage.getItem("jwt");
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(processServerResponse);
}

function deleteItem(selectedCard, token) {
  return fetch(`${BASE_URL}/items/${selectedCard._id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

function getUserInfo(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
}

export { getItems, addNewItem, deleteItem, getUserInfo, checkResponse };
