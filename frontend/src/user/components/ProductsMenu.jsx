import React, { useEffect, useRef, useState } from "react";
import "./ProductsMenu.css";
import { Link } from "react-router-dom";

function ProductsMenu({ records, fetchRecords }) {
  const [isProductsMenuExpanded, setIsProductsMenuExpanded] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsProductsMenuExpanded(false);
        setActiveCategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onClickProductsMenuHandler = async (event) => {
    event.preventDefault();
    if (!isProductsMenuExpanded && records.length === 0) {
      fetchRecords();
    }
    setIsProductsMenuExpanded((prevValue) => !prevValue);
  };

  return (
    <div className="all-products-container">
      <div className="products-hamburger-menu">
        <button ref={buttonRef} onClick={onClickProductsMenuHandler}>
          <svg
            width="40"
            height="24"
            viewBox="0 0 42 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2H40"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
            ></path>
            <path
              d="M2 12H28"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
            ></path>
            <path
              d="M2 22H17"
              stroke="black"
              strokeWidth="4"
              strokeLinecap="round"
            ></path>
          </svg>
          <span>
            <h3>Products</h3>
          </span>
        </button>
      </div>
      <div className="products-dropdown-menu" ref={menuRef}>
        {isProductsMenuExpanded && (
          <ul className="products-categories-menu">
            <div className="products-menu-triangle" />
            {records?.map((record, index) => (
              <li
                key={record._id}
                className={`single-products-category ${
                  activeCategory === record._id ? "active" : ""
                }`}
                onMouseEnter={() => setActiveCategory(record._id)}
              >
                <Link className="single-category-name" to={`/${record.slug}`}>
                  {record.name}
                  {activeCategory === record._id && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 512 512"
                      version="1.1"
                    >
                      <path
                        d=""
                        stroke="none"
                        fill="#080404"
                        fillRule="evenodd"
                      />
                      <path
                        d="M 102.972 33.816 C 84.241 40.017, 71.110 53.414, 65.612 71.932 C 64.155 76.839, 64 94.585, 64 255.971 C 64 452.982, 63.577 439.752, 70.281 452.418 C 76.961 465.039, 91.724 476.140, 105.680 479.037 C 113.703 480.703, 128.155 479.805, 135.369 477.193 C 139.017 475.872, 195.044 441.096, 283.369 385.331 C 438.472 287.405, 433.722 290.682, 441.222 276.402 C 446.154 267.010, 448 259.461, 448 248.684 C 448 229.239, 439.500 212.107, 424.646 201.610 C 416.136 195.596, 142.116 37.425, 135.696 34.821 C 128.242 31.797, 110.698 31.259, 102.972 33.816"
                        stroke="none"
                        fill="#040404"
                        fillRule="evenodd"
                      />
                    </svg>
                  )}
                </Link>
                {activeCategory === record._id && (
                  <ul className="products-subcategories-menu">
                    {records?.map((record) => {
                      return (
                        record._id === activeCategory &&
                        record.subcategories?.map((subcategory) => {
                          return (
                            <li
                              className="single-products-subcategory"
                              key={subcategory._id}
                            >
                              <Link
                                className="single-subcategory-name"
                                to={`/${record.slug}/${subcategory.slug}`}
                              >
                                {subcategory.name}
                              </Link>
                              <ul className="product-groups-menu">
                                {subcategory.groups?.map((group) => {
                                  return (
                                    <li
                                      key={group._id}
                                      className="single-products-group"
                                    >
                                      <Link
                                        className="single-group-name"
                                        to={`/${record.slug}/${subcategory.slug}/${group.slug}`}
                                      >
                                        {group.name}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </li>
                          );
                        })
                      );
                    })}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProductsMenu;
