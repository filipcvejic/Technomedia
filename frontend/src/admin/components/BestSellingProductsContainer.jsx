import React from "react";

import "./BestSellingProductsContainer.css";
import ShoppingIcon from "../svgs/ShoppingIcon";
import Loader from "../../shared/components/Loader";

function BestSellingProductsContainer({ chartData }) {
  return (
    <div className="best-selling-products-container">
      {chartData.length > 0 ? (
        <>
          <div className="best-selling-products-header">
            <ShoppingIcon />
            <h1>Best selling products</h1>
          </div>
          <div className="best-selling-products-list-wrapper">
            <div className="products-labels">
              <span className="name-label">Product name</span>
              <span className="price-label">Price</span>
              <span className="order-id-label">Product ID</span>
              <span className="sales-label">Sales</span>
            </div>
            <ul className="best-selling-products-list">
              {chartData?.map((singleItem, index) => (
                <li className="best-selling-product-item" key={index}>
                  <span className="best-selling-product-item-rank">
                    {index + 1}
                  </span>
                  <span className="best-selling-product-item-name">
                    {singleItem.name}
                  </span>
                  <span className="best-selling-product-item-price">
                    {singleItem.price}$
                  </span>
                  <span className="best-selling-product-item-order-id">
                    #{singleItem.productId}
                  </span>
                  <span className="best-selling-product-item-sales">
                    {singleItem.quantity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default BestSellingProductsContainer;
