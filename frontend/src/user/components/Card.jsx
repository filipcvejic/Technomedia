import React from "react";

import "./Card.css";

function Card({ children }) {
  return (
    <div className="product-item">
      <div className="product-item-info">{children}</div>
    </div>
  );
}

export default Card;
