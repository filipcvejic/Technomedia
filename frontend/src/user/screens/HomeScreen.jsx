import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import "./HomeScreen.css";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const getProducts = async () => {
        const response = await fetch("http://localhost:3000/api/products");

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setProducts(data.products);
      };

      getProducts();
    } catch (err) {
      toast.error(err?.message);
    }
  }, []);

  return (
    <div className="homepage">
      <div className="products">
        {products.map((product) => (
          <ProductItem key={product._id} data={product} />
        ))}

        <div class="product-item">
          <div class="product-item-info">
            <a href="/product/65db3a4e225e0d8b50621a2e">
              <span class="product-image-container">
                <img
                  class="product-image-photo"
                  src="http://localhost:5000/images/1e1174b0-aee0-42c4-b1db-4d319d5d2a2c_.png"
                  alt="Nnead"
                />
              </span>
            </a>
            <div class="product-item-details">
              <strong class="product-item-name">
                <a href="/product/65db3a4e225e0d8b50621a2e">Nnead</a>
              </strong>
              <div class="price-container">
                <span class="price">123 EUR</span>
              </div>
              <div class="product-item-actions">
                <div class="cart-action">
                  <button class="cart-button" title="Add product to cart">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="white"
                      class="bi bi-cart-icon"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="product-item">
          <div class="product-item-info">
            <a href="/product/65db3a4e225e0d8b50621a2e">
              <span class="product-image-container">
                <img
                  class="product-image-photo"
                  src="http://localhost:5000/images/1e1174b0-aee0-42c4-b1db-4d319d5d2a2c_.png"
                  alt="Nnead"
                />
              </span>
            </a>
            <div class="product-item-details">
              <strong class="product-item-name">
                <a href="/product/65db3a4e225e0d8b50621a2e">Nnead</a>
              </strong>
              <div class="price-container">
                <span class="price">123 EUR</span>
              </div>
              <div class="product-item-actions">
                <div class="cart-action">
                  <button class="cart-button" title="Add product to cart">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="white"
                      class="bi bi-cart-icon"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="product-item">
          <div class="product-item-info">
            <a href="/product/65db3a4e225e0d8b50621a2e">
              <span class="product-image-container">
                <img
                  class="product-image-photo"
                  src="http://localhost:5000/images/1e1174b0-aee0-42c4-b1db-4d319d5d2a2c_.png"
                  alt="Nnead"
                />
              </span>
            </a>
            <div class="product-item-details">
              <strong class="product-item-name">
                <a href="/product/65db3a4e225e0d8b50621a2e">Nnead</a>
              </strong>
              <div class="price-container">
                <span class="price">123 EUR</span>
              </div>
              <div class="product-item-actions">
                <div class="cart-action">
                  <button class="cart-button" title="Add product to cart">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="white"
                      class="bi bi-cart-icon"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="product-item">
          <div class="product-item-info">
            <a href="/product/65db3a4e225e0d8b50621a2e">
              <span class="product-image-container">
                <img
                  class="product-image-photo"
                  src="http://localhost:5000/images/1e1174b0-aee0-42c4-b1db-4d319d5d2a2c_.png"
                  alt="Nnead"
                />
              </span>
            </a>
            <div class="product-item-details">
              <strong class="product-item-name">
                <a href="/product/65db3a4e225e0d8b50621a2e">Nnead</a>
              </strong>
              <div class="price-container">
                <span class="price">123 EUR</span>
              </div>
              <div class="product-item-actions">
                <div class="cart-action">
                  <button class="cart-button" title="Add product to cart">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="white"
                      class="bi bi-cart-icon"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
