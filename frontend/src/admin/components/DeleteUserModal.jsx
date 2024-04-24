import React from "react";
import ReactDOM from "react-dom";

import "./DeleteUserModal.css";

function DeleteUserModal({ onConfirmDelete, onCancelDelete }) {
  const outsideModalClickHandler = (event) => {
    if (event.target.classList.contains("modal-overlay")) {
      onCancelDelete();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={outsideModalClickHandler}>
      <div className="modal">
        <p>
          Do you want to delete
          <span>the user?</span>
        </p>
        <div className="modal-user-actions">
          <button
            className="confirm-delete-user-button"
            onClick={() => onConfirmDelete()}
          >
            CONFIRM
          </button>
          <button
            className="cancel-delete-user-button"
            onClick={() => onCancelDelete()}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default DeleteUserModal;
