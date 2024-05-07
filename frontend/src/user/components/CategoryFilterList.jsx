import React, { useEffect, useRef, useState } from "react";

function CategoryFilterList({ icon, searchResults }) {
  const [isCategoriesListShown, setIsCategoriesListShown] = useState(true);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    const scrollHeight = contentRef.current.scrollHeight;
    setHeight(isCategoriesListShown ? scrollHeight + 20 : 0);
  }, [isCategoriesListShown]);

  return (
    <div className="category-filter-container">
      <div
        className="category-filter-header"
        onClick={() => setIsCategoriesListShown((prevValue) => !prevValue)}
      >
        <h3>Categories</h3>
        <span
          className="arrow-icon"
          style={{
            transform: isCategoriesListShown ? "rotate(180deg)" : "rotate(0)",
          }}
        >
          {icon}
        </span>
      </div>

      <ul
        className="categories-filter-list"
        ref={contentRef}
        style={{
          height: height,
          transition: "height 0.3s ease-in-out",
          overflow: "hidden",
        }}
      >
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
    </div>
  );
}

export default CategoryFilterList;
