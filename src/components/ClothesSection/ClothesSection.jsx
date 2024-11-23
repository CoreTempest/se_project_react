import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./ClothesSection.css";

function ClothesSection({
  clothingItems,
  handleCardLike,
  handleAddClick,
  onCardClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__items-title">Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-item-btn"
        >
          + Add New
        </button>
      </div>
      <ul className="cards__list">
        {clothingItems &&
          clothingItems
            .filter((item) => item.owner === currentUser._id)
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                  onCardLike={handleCardLike}
                />
              );
            })}
      </ul>
    </div>
  );
}
export default ClothesSection;
