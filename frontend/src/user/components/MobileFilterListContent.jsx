import ReactDOM from "react-dom";
import "./MobileFilterListContent.css";
import { useRef } from "react";
import SubcategoryListContainer from "./SubcategoryListContainer";
import BrandFilterList from "./BrandFilterList";
import PriceRangeSlider from "./PriceRangeSlider";
import SpecificationsFilterList from "./SpecificationsFilterList";
import { useSearchParams } from "react-router-dom";

import "./MobileFilterListContent.css";
import XIcon from "../svgs/XIcon";
import outsideClickHandler from "../utils/outsideClickHandler";

function MobileFilterListContent({ onClose, filters }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const mobileFilterListRef = useRef(null);

  outsideClickHandler(mobileFilterListRef, onClose);

  const clearAllFilterHandler = () => {
    setSearchParams(new URLSearchParams());
  };

  return ReactDOM.createPortal(
    <div className="mobile-filter-list-overlay">
      <div className="mobile-filter-list-container" ref={mobileFilterListRef}>
        <div className="mobile-filter-list-header">
          <h2>Filters</h2>
          <button className="close-mobile-filter-list-button" onClick={onClose}>
            <XIcon />
          </button>
        </div>
        <ul className="mobile-filter-list">{filters}</ul>
        <div className="mobile-filter-list-actions-wrapper">
          <div className="mobile-filter-list-actions">
            <button
              className="delete-all-filters-button"
              onClick={clearAllFilterHandler}
            >
              Delete all
            </button>
            <button className="show-selected-filters-button" onClick={onClose}>
              Show
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default MobileFilterListContent;
