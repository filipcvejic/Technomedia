import React, { useState } from "react";
import ArrowIcon from "../svgs/ArrowIcon";
import "./FilterProductsButton.css";
import MobileFilterListContent from "./MobileFilterListContent";

function FilterProductsButton({ filters }) {
  const [isMobileFilterListExpanded, setIsMobileFilterListExpanded] =
    useState(false);

  const closeMobileFilterListHandler = () => {
    setIsMobileFilterListExpanded(false);
  };

  return (
    <>
      <button
        className="mobile-filter-button"
        onClick={() => setIsMobileFilterListExpanded(true)}
      >
        <span>Filtering</span> <ArrowIcon />
      </button>
      {isMobileFilterListExpanded && (
        <MobileFilterListContent
          onClose={closeMobileFilterListHandler}
          filters={filters}
        />
      )}
    </>
  );
}

export default FilterProductsButton;
