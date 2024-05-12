import React, { useState } from "react";
import BrandItem from "./BrandItem";

function BrandFilterList({ icon, brands }) {
  const [isBrandsListShown, setIsBrandsListShown] = useState(true);

  return (
    <div className="brand-filter-container">
      <div
        className="brand-filter-header"
        onClick={() => setIsBrandsListShown((prevValue) => !prevValue)}
      >
        <h3>Brand</h3>
        <span
          className="arrow-icon"
          style={{
            transform: isBrandsListShown ? "rotate(180deg)" : "rotate(0)",
          }}
        >
          {icon}
        </span>
      </div>
      {isBrandsListShown && (
        <ul className="brands-filter-list">
          {brands?.map((brand, index) => (
            <BrandItem key={index} brandName={brand.name} label={"brand"} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default BrandFilterList;
