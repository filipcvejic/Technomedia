import React from "react";
import ReactDOM from "react-dom";
import "./OrderModalTemplate.css";

function OrderModalTemplate({ status }) {
  const isSuccessful = status === "success";

  return ReactDOM.createPortal(
    <div className="order-modal">
      <div className="modal-content">
        <div className={isSuccessful ? "checkmark-circle" : "cross-circle"}>
          <div className={isSuccessful ? "checkmark" : "cross"}>
            <svg
              className={isSuccessful ? "checkmark-svg" : "cross-svg"}
              viewBox="0 0 52 52"
            >
              {isSuccessful ? (
                <path className="checkmark-path" d="M14 27l10 10L38 16" />
              ) : (
                <>
                  <path className="cross-path" d="M16 16l20 20" />
                  <path className="cross-path" d="M36 16l-20 20" />
                </>
              )}
            </svg>
          </div>
        </div>
        <h2>{isSuccessful ? "Order Confirmed!" : "Order Failed!"}</h2>
      </div>
    </div>,
    document.body
  );
}

export default OrderModalTemplate;
