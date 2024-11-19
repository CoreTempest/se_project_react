import "./ItemModal.css";
import close from "../../assets/white-close.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, openDeleteModal, selectedCard }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn =
    selectedCard && currentUser && selectedCard.owner === currentUser._id;

  const itemDeleteButton = `modal__delete-btn ${
    isOwn ? "modal__delete-btn_visible" : "modal__delete-btn_hidden"
  }`;

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close-btn">
          <img src={close} alt="close-button" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        <button
          onClick={() => {
            openDeleteModal();
          }}
          className={itemDeleteButton}
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
