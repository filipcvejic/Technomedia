import React from "react";

import "./FilteredProductsList.css";
import ProductItem from "./ProductItem";

function FilteredProductsList({ products }) {
  return (
    <div className="filtered-products-list">
      {products.map((product) => (
        <ProductItem data={product} key={product._id} />
      ))}
    </div>
  );
}

export default FilteredProductsList;
