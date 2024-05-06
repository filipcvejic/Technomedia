import React, { useState } from "react";

function BrandFilterList({ icon, searchResults }) {
  const [isBrandsListShown, setIsBrandsListShown] = useState(true);

  return (
    <div className="brand-filter-container">
      <div
        className="brand-filter-header"
        onClick={() => setIsBrandsListShown((prevValue) => !prevValue)}
      >
        <h3>Brand</h3>
        <span className="arrow-icon">{icon}</span>
      </div>
      {isBrandsListShown && (
        <ul className="brands-filter-list">
          {Array.from(
            new Set(searchResults.map((product) => product.brand.name))
          ).map((brandName, index) => (
            <li className="single-product-brand" key={index}>
              <label>
                <input type="checkbox" className="custom-checkbox" />
                <span className="checkbox-custom"></span>
                {brandName}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BrandFilterList;
