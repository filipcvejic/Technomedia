import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "./HamburgerContent.css";
import RightArrowIcon from "../svgs/RightArrowIcon";
import LeftArrowIcon from "../svgs/LeftArrowIcon";
import XIcon from "../svgs/XIcon";
import outsideClickHandler from "../utils/outsideClickHandler";

function HamburgerContent({ records, onCloseMenu }) {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const hamburgerMenuRef = useRef(null);

  outsideClickHandler(hamburgerMenuRef, onCloseMenu);

  const handleBack = () => {
    if (breadcrumbs.length > 0) {
      setBreadcrumbs(breadcrumbs.slice(0, -1));
    }
  };

  const handleLinkClick = () => {
    onCloseMenu();
  };

  const renderContent = (data, type) => {
    return data.map((item) => (
      <li key={item._id} className={`single-hamburger-menu-${type}`}>
        <Link to={generateLink(item)} onClick={handleLinkClick}>
          {item.name}
        </Link>
        {item.subcategories && (
          <button onClick={() => setBreadcrumbs([...breadcrumbs, item])}>
            <RightArrowIcon />
          </button>
        )}
        {item.groups && (
          <button onClick={() => setBreadcrumbs([...breadcrumbs, item])}>
            <RightArrowIcon />
          </button>
        )}
      </li>
    ));
  };

  const generateLink = (item) => {
    let link = "";
    breadcrumbs.forEach((crumb) => {
      link += `/${crumb.slug}`;
    });
    return `${link}/${item.slug}`;
  };

  return ReactDOM.createPortal(
    <div className="hamburger-menu-overlay">
      <div className="hamburger-menu-wrapper" ref={hamburgerMenuRef}>
        <div className="hamburger-menu-content">
          <div className="hamburger-menu-actions">
            <button
              className="close-hamburger-menu-button"
              onClick={onCloseMenu}
            >
              <XIcon />
            </button>
            {breadcrumbs.length > 0 && (
              <button
                className="back-hamburger-menu-button"
                onClick={handleBack}
              >
                <LeftArrowIcon />
                Back
              </button>
            )}
          </div>
          <ul className="hamburger-menu-list">
            {breadcrumbs.length === 0
              ? renderContent(records, "category")
              : renderContent(
                  breadcrumbs[breadcrumbs.length - 1].subcategories ||
                    breadcrumbs[breadcrumbs.length - 1].groups,
                  "subcategory"
                )}
          </ul>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default HamburgerContent;
