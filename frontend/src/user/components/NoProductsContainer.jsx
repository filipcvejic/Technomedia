import React from "react";
import "./NoProductsContainer.css";

function NoProductsContainer({ label }) {
  return (
    <div className="no-products-wrapper">
      <p className="no-products-content">
        There are no products available for this {label}. 😔
      </p>
    </div>
  );
}

export default NoProductsContainer;
