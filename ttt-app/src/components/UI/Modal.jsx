// Modal.js
import "./Modal.css";

const Modal = ({ isOpen, onClick, onEdit, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClick}>
          <img src="src\assets\image.png" />
        </button>
        <button className="edit-button" onClick={onEdit}>
          수정
        </button>
        <hr />
        <button className="delete-button" onClick={onDelete}>
          삭제
        </button>
      </div>
    </div>
  );
};

export default Modal;
