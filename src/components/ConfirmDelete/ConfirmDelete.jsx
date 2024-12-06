import "./ConfirmDelete.css";
import closeBtn from "../../assets/closebutton.png";

function ConfirmDeleteModal({ isOpen, onClose, handleDeleteItem }) {
  return (
    <div className={`modal  ${isOpen === "delete" && "modal_opened"}`}>
      <div className="modal__container modal__content_type_delete">
        <button className="modal__close" type="button" onClick={onClose} />
        <div className="modal__questions">
          <p className="modal__delete__header">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__question_warning">This action is irreversible</p>
          <div className="modal__delete-btns">
            <button
              className="modal__delete_btn modal__question_confirm"
              onClick={handleDeleteItem}
            >
              Yes, Delete Item
            </button>
            <button className="modal__question_cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
