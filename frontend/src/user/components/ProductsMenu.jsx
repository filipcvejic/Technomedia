import { useState } from "react";

import { useProductsContext } from "../context/products-context";

import "./ProductsMenu.css";

function ProductsMenu() {
  const [isProductsMenuExpanded, setIsProductsMenuExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onClickProductsMenuHandler = (event) => {
    event.preventDefault();

    setIsProductsMenuExpanded((prevValue) => !prevValue);
  };

  const onHoverCategoryHandler = (id) => {
    setSelectedCategory(id);
  };

  const { products, isLoading } = useProductsContext();

  console.log(selectedCategory);
  return (
    <div className="all-products-container">
      <div className="products-hamburger-menu">
        <button onClick={onClickProductsMenuHandler}>
          <svg
            width="42"
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
      <div className="products-dropdown-menu">
        {isProductsMenuExpanded && (
          <ul className="products-categories-menu">
            {products.map((product, index) => (
              <li
                className="single-products-category"
                key={product._id}
                onMouseEnter={() =>
                  onHoverCategoryHandler(product.category._id)
                }
                onMouseLeave={() => setSelectedCategory(null)}
              >
                <a href={`/${product.category.name.toLowerCase()}`}>
                  {product.category.name}
                </a>
              </li>
            ))}
          </ul>
        )}
        {selectedCategory && (
          <ul className="products-subcategories-menu">
            {products.map((product) => {
              product.category._id === selectedCategory && (
                <li className="single-products-subcategory">
                  {product.subcategory.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProductsMenu;
