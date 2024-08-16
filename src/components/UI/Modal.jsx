// Modal.js
import "./Modal.css";

const Modal = ({ context1, context2, isOpen, onClick, onEdit, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="edit-button" onClick={onEdit}>
          {context1}
        </button>
        <hr />
        <button className="delete-button" onClick={onDelete}>
          {context2}
        </button>

        {/* <button className="close-button" onClick={onClick}>
          <img src="src\assets\image.png" />
        </button> */}
      </div>
    </div>
  );
};

export default Modal;
