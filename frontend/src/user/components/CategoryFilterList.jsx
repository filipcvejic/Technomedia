import React, { useState } from "react";

function CategoryFilterList({ icon, searchResults }) {
  const [isCategoriesListShown, setIsCategoriesListShown] = useState(true);

  return (
    <div className="category-filter-container">
      <div
        className="category-filter-header"
        onClick={() => setIsCategoriesListShown((prevValue) => !prevValue)}
      >
        <h3>Categories</h3>
        <span className="arrow-icon">{icon}</span>
      </div>
      {isCategoriesListShown && (
        <ul className="categories-filter-list">
          {Array.from(
            new Set(searchResults.map((product) => product.category.name))
          ).map((categoryName, index) => (
            <li className="single-product-category" key={index}>
              <label>
                <input type="checkbox" className="custom-checkbox" />
                <span className="checkbox-custom"></span>
                {categoryName}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryFilterList;
