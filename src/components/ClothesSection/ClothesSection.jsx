import React from "react";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  currentUser,
  onCardLike,
}) {
  const userClothingItems = clothingItems.filter(
    (item) => item?.owner === currentUser?._id
  );

  const clothesSectionClassName = `clothes-section__items ${
    userClothingItems?.length > 0
      ? "clothes-section__items_visible"
      : "clothes-section__items_hidden"
  }`;
  return (
    <div className="clothes-section">
      <div className="clothes-section__buttons">
        <p className="clothes-section__current-items">Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-item-btn"
        >
          {" "}
          + Add New
        </button>
      </div>
      <ul className={clothesSectionClassName}>
        {userClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              handleCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}
export default ClothesSection;
