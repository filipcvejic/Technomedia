import React, { useState } from "react";
import "./AddToCartButton.css";
import { useCartActions } from "../hooks/useCartActions";

function AddToCartButton({ data }) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const { addToCart } = useCartActions();

  const onAddProductToCartHandler = async (e) => {
    e.preventDefault();

    console.log(data);

    addToCart(data);

    setIsAddedToCart(true);

    setTimeout(() => {
      setIsAddedToCart(false);
    }, 1000);
  };

  return (
    <button
      className={`cart-button ${isAddedToCart && "active"}`}
      title="Add product to cart"
      onClick={onAddProductToCartHandler}
    >
      {isAddedToCart ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 27 26"
          version="1.1"
        >
          <path
            d="M 15.943 7.750 C 12.589 12.013, 9.542 15.606, 9.172 15.737 C 8.803 15.867, 7.465 14.376, 6.199 12.423 C 3.801 8.722, 0.796 8.105, 0.202 11.191 C -0.119 12.857, 7.588 26.035, 8.840 25.961 C 9.203 25.940, 11.075 23.830, 13 21.272 C 14.925 18.715, 18.846 13.551, 21.712 9.795 C 26.940 2.948, 27.603 0, 23.914 -0 C 22.770 -0, 19.670 3.014, 15.943 7.750"
            stroke="none"
            fill="#fffcfc"
            fillRule="evenodd"
          />
          <path d="" stroke="none" fill="#fcfcfc" fillRule="evenodd" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 256 256"
          version="1.1"
        >
          <path
            d="M 4.528 12.272 C 1.803 14.997, 1 16.616, 1 19.384 C 1 24.804, 4.823 28.068, 18.207 34.076 C 24.645 36.966, 30.166 39.990, 30.475 40.796 C 30.784 41.601, 36.922 67.964, 44.115 99.380 C 51.309 130.796, 58.107 158.641, 59.223 161.257 C 61.507 166.610, 66.396 171.367, 72.435 174.110 C 76.261 175.847, 80.562 175.957, 145.500 175.968 L 214.500 175.980 219.500 173.647 C 224.932 171.112, 230.850 165.241, 232.760 160.493 C 235.355 154.040, 254.999 66.666, 254.978 61.671 C 254.939 52.418, 249.480 43.875, 240.620 39.201 L 235.500 36.500 157.500 36.236 C 84.650 35.989, 79.269 36.088, 76 37.736 C 71.042 40.235, 69.238 45.789, 71.732 50.876 C 72.704 52.861, 74.625 55.044, 76 55.727 C 77.926 56.685, 95.991 56.974, 154.679 56.985 C 238.882 57.002, 234.078 56.617, 233.930 63.321 C 233.891 65.070, 229.278 86.062, 223.680 109.972 C 214.173 150.567, 213.335 153.527, 211 154.707 C 209.066 155.685, 194.313 155.974, 145.797 155.985 C 81.405 156, 78.668 155.844, 77.570 152.098 C 77.312 151.219, 71.201 124.625, 63.989 93 C 56.777 61.375, 49.969 33.598, 48.860 31.273 C 47.751 28.949, 45.417 25.834, 43.672 24.352 C 39.441 20.757, 16.469 9.877, 11.778 9.245 C 8.527 8.808, 7.609 9.191, 4.528 12.272 M 93.479 196.752 C 83.770 200.205, 78.489 206.055, 75.973 216.146 C 71.149 235.494, 92.872 253.188, 111.132 244.784 C 117.172 242.004, 122.040 237.458, 124.704 232.108 C 127.355 226.783, 127.129 214.819, 124.276 209.405 C 118.394 198.246, 104.884 192.695, 93.479 196.752 M 184.500 195.930 C 171.596 199.052, 162.978 210.811, 164.289 223.509 C 166.628 246.175, 194.666 255.059, 209.429 237.811 C 221.653 223.531, 214.975 201.931, 196.655 196.490 C 191.267 194.890, 189.195 194.795, 184.500 195.930 M 97.020 213.284 C 91.573 216.040, 90.559 222.712, 94.923 227.077 C 100.938 233.091, 110 229.519, 110 221.134 C 110 217.944, 109.404 216.677, 106.923 214.589 C 103.537 211.739, 100.789 211.377, 97.020 213.284 M 184.046 214.800 C 177.912 220.934, 181.383 230, 189.866 230 C 193.088 230, 194.321 229.407, 196.510 226.805 C 201.288 221.127, 198.270 213.567, 190.737 212.345 C 187.600 211.836, 186.669 212.177, 184.046 214.800"
            stroke="none"
            fill="#fffcfc"
            fillRule="evenodd"
          />
          <path d="" stroke="none" fill="#fcfcfc" fillRule="evenodd" />
        </svg>
      )}
    </button>
  );
}

export default AddToCartButton;
