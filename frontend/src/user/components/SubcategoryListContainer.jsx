import React from "react";
import { Link } from "react-router-dom";
import "./SubcategoryListContainer.css";

function SubcategoryListContainer({ subcategories }) {
  return (
    <div className="subcategory-filter-container">
      <div className="subcategory-filter-header">
        <h3>Subcategories</h3>
      </div>
      <ul className="subcategories-filter-list">
        {subcategories.map((item, index) => (
          <li key={index} className="single-subcategory-filter">
            <Link to={`${item.subcategory.slug}`}>
              <span className="single-subcategory-filter-name">
                {item.subcategory.name}
              </span>
              <span className="single-subcategory-filter-count">
                ({item.count})
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubcategoryListContainer;
