import React, { useState, useRef } from "react";
import SpecificationsItem from "./SpecificationsItem";

function SpecificationsFilterList({ icon, searchResults }) {
  const [visibleTypes, setVisibleTypes] = useState({});

  const toggleVisibilityHandler = (specType) => {
    setVisibleTypes((prevVisibleTypes) => ({
      ...prevVisibleTypes,
      [specType]: !prevVisibleTypes[specType],
    }));
  };

  return (
    <div className="specifications-filter-container">
      {Array.from(
        new Set(
          searchResults.flatMap((product) =>
            product.specifications.map((spec) => spec.type)
          )
        )
      ).map((specType, specTypeIndex) => (
        <div
          className="single-specification-filter-container"
          key={specTypeIndex}
        >
          <div
            className="specifications-filter-header"
            onClick={() => {
              toggleVisibilityHandler(specType);
            }}
          >
            <h3>{specType}</h3>
            <span
              className="arrow-icon"
              style={{
                transform: visibleTypes[specType]
                  ? "rotate(180deg)"
                  : "rotate(0)",
              }}
            >
              {icon}
            </span>
          </div>
          {visibleTypes[specType] && (
            <ul className="specifications-filter-list">
              {Array.from(
                new Set(
                  searchResults.flatMap((product) =>
                    product.specifications
                      .filter((spec) => spec.type === specType)
                      .map((spec) => spec.value)
                  )
                )
              ).map((specValue, specValueIndex) => (
                <SpecificationsItem
                  key={specValueIndex}
                  specValue={specValue}
                  specType={specType}
                />
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default SpecificationsFilterList;
