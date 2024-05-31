import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "./MobileSortListContent.css";
import outsideClickHandler from "../utils/outsideClickHandler";
import XIcon from "../svgs/XIcon";

function MobileSortListContent({
  options,
  additionalOptions,
  activeFilter,
  onSelectOption,
  onClose,
}) {
  const mobileSortListRef = useRef(null);

  outsideClickHandler(mobileSortListRef, onClose);

  return ReactDOM.createPortal(
    <div className="mobile-sort-list-overlay">
      <div className="mobile-sort-list-container" ref={mobileSortListRef}>
        <div className="mobile-sort-list-header">
          <h2>Sorting by:</h2>
          <button className="close-mobile-sort-list-button" onClick={onClose}>
            <XIcon />
          </button>
        </div>
        <ul className="mobile-sort-list">
          {additionalOptions?.map((option, index) => (
            <li key={index} className="mobile-sort-list-item">
              <span className="radio-label">{option}</span>
              <label className="custom-radio">
                <input
                  type="radio"
                  name="sortOption"
                  className="radio-input"
                  value={option}
                  checked={activeFilter === option}
                  onChange={(e) => {
                    onSelectOption(e);
                    onClose();
                  }}
                />
                <span className="radio-control"></span>
              </label>
            </li>
          ))}
          {options?.map((option, index) => (
            <li key={index} className="mobile-sort-list-item">
              <span className="radio-label">{option}</span>
              <label className="custom-radio">
                <input
                  type="radio"
                  name="sortOption"
                  className="radio-input"
                  value={option}
                  checked={activeFilter === option}
                  onChange={(e) => {
                    onSelectOption(e);
                    onClose();
                  }}
                />
                <span className="radio-control"></span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default MobileSortListContent;
