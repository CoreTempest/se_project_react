import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

const AddItemModal = ({ handleCloseModal, onAddNewItem, isOpen }) => {
  const [name, setName] = useState("");
  const [link, setUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    console.log(e.target.value);
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNewItem({ name, link, weather });
  };
  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      closeActiveModal={handleCloseModal}
      onSubmit={onAddNewItem}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="link" className="modal__label">
        Image{" "}
        <input
          type="text"
          className="modal__input"
          id="link"
          placeholder="Image URL"
          value={link}
          onChange={handleUrlChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            value="hot"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            name="weather_item"
          />
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            value="warm"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            name="weather_item"
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            value="cold"
            className="modal__radio-input"
            onChange={handleWeatherChange}
            name="weather_item"
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
