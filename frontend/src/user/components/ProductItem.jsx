import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../shared/components/Card";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartApi";
import "./ProductItem.css";
import { addToCartForGuest } from "../features/cart/cartSlice";

function ProductItem({ data }) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userAuth);

  console.log(data);

  const addToCartHandler = async (e) => {
    e.preventDefault();

    if (userInfo) {
      dispatch(
        addToCart({
          product: data?._id,
          name: data.name,
          description: data.description,
          price: data.price,
          images: data.images,
          category: data.category?._id,
          subcategory: data.subcategory?._id,
          group: data.group?._id,
          brand: data.brand?._id,
        })
      );
    } else {
      dispatch(
        addToCartForGuest({
          product: {
            _id: data._id,
            name: data.name,
            description: data.description,
            price: data.price,
            images: data.images,
            category: data.category?._id,
            subcategory: data.subcategory?._id,
            group: data.group?._id,
            brand: data.brand?._id,
          },
        })
      );
    }

    setIsAddedToCart(true);

    setTimeout(() => {
      setIsAddedToCart(false);
    }, 1000);
  };

  return (
    <Card>
      <div className="wish-list-action">
        <button className="wish-list-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 512 512"
            version="1.1"
          >
            <path d="" stroke="none" fill="#080404" fillRule="evenodd" />
            <path
              d="M 119 44.490 C 73.041 52.361, 34.848 80.464, 14.215 121.591 C 9.364 131.259, 4.729 144.658, 2.312 156 C -0.272 168.124, -0.238 199.951, 2.372 212 C 6.928 233.036, 16.542 254.898, 28.739 271.956 C 44.686 294.261, 95.066 341.588, 174.500 408.886 C 217.503 445.319, 243.085 466.138, 246.712 467.653 C 251.933 469.835, 261.977 469.384, 266.838 466.750 C 270.976 464.507, 320.961 423.252, 358 391.508 C 419.727 338.605, 466.079 294.789, 480.288 275.911 C 496.044 254.977, 506.596 231.031, 509.994 208.500 C 510.658 204.100, 511.606 199.719, 512.100 198.764 C 513.372 196.309, 513.277 166.711, 512 167.500 C 511.431 167.852, 511 166.996, 511 165.517 C 511 164.086, 510.295 159.447, 509.433 155.208 C 499.641 107.053, 462.723 65.753, 415.500 50.123 C 400.583 45.186, 392.677 43.874, 374.331 43.295 C 354.321 42.662, 343.385 44.080, 326.187 49.534 C 303.994 56.572, 287.373 66.806, 268.756 84.895 L 256 97.289 243.244 84.895 C 230.040 72.065, 221.943 66.042, 207.764 58.499 C 197.396 52.983, 178.427 46.650, 166.074 44.580 C 154.711 42.675, 129.870 42.628, 119 44.490 M 120.192 90.987 C 85.795 98.988, 57.772 126.022, 48.861 159.802 C 46.250 169.699, 45.370 187.227, 46.937 198.122 C 49.219 213.988, 55.976 230.560, 66.049 245 C 80.145 265.206, 146.463 325.918, 235.251 399.898 L 256.002 417.188 273.751 402.384 C 344.915 343.024, 388.879 304.152, 420.609 272.537 C 446.494 246.746, 454.039 236.026, 460.961 215.211 C 466.670 198.042, 467.490 176.307, 463.062 159.500 C 453.973 125.001, 424.670 97.694, 389.001 90.485 C 377.268 88.113, 354.718 88.846, 344.067 91.945 C 334.888 94.617, 323.971 99.601, 316.308 104.620 C 313.113 106.712, 301.500 117.261, 290.500 128.062 C 279.500 138.863, 268.987 148.480, 267.137 149.434 C 261.913 152.128, 254.160 152.546, 247.913 150.471 C 243.160 148.893, 240.227 146.410, 222.027 128.564 C 200.827 107.777, 195.008 103.184, 182.625 97.462 C 169.244 91.280, 162.237 89.800, 144.500 89.408 C 131.323 89.117, 127.034 89.396, 120.192 90.987 M 0.405 183.500 C 0.406 192.300, 0.559 195.766, 0.745 191.203 C 0.930 186.639, 0.929 179.439, 0.742 175.203 C 0.555 170.966, 0.404 174.700, 0.405 183.500"
              stroke="none"
              fill="#040404"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <a
        href={`/${data.category.slug}/${data.subcategory.slug}/${data.group.slug}/${data.slug}`}
      >
        <span className="product-image-container">
          <img
            className="product-image-photo"
            src={`http://localhost:5000/images/${
              data.images[0].url.split("\\")[2]
            }`}
            alt={data.name}
          />
        </span>
      </a>
      <div className="product-item-details">
        <strong className="product-item-name">
          <a
            href={`/${data.category.slug}/${data.subcategory.slug}/${data.group.slug}/${data.slug}`}
          >
            {data.name}
          </a>
        </strong>
        <div className="product-item-ratings">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="20"
            viewBox="0 0 22 20"
            version="1.1"
          >
            <path
              d="M 9.006 2.484 C 8.453 3.939, 8 5.525, 8 6.008 C 8 6.490, 6.088 7.023, 3.750 7.193 L -0.500 7.500 2.666 10.341 C 5.527 12.907, 5.733 13.467, 4.801 16.142 C 3.441 20.041, 4.402 20.784, 8.031 18.641 C 10.861 16.969, 11.139 16.969, 13.969 18.641 C 17.623 20.799, 18.558 20.039, 17.165 16.044 C 16.192 13.253, 16.352 12.799, 19.001 10.841 C 23.340 7.633, 23.362 6.413, 19.073 6.822 C 15.219 7.189, 13.498 6.016, 12.858 2.583 C 12.302 -0.393, 10.121 -0.449, 9.006 2.484 M 0 7.500 C 0 7.775, 0.225 8, 0.500 8 C 0.775 8, 1 7.775, 1 7.500 C 1 7.225, 0.775 7, 0.500 7 C 0.225 7, 0 7.225, 0 7.500"
              stroke="none"
              fill="#ff9c04"
              fillRule="evenodd"
            />
            <path d="" stroke="none" fill="#fc9c04" fillRule="evenodd" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="20"
            viewBox="0 0 22 20"
            version="1.1"
          >
            <path
              d="M 9.006 2.484 C 8.453 3.939, 8 5.525, 8 6.008 C 8 6.490, 6.088 7.023, 3.750 7.193 L -0.500 7.500 2.666 10.341 C 5.527 12.907, 5.733 13.467, 4.801 16.142 C 3.441 20.041, 4.402 20.784, 8.031 18.641 C 10.861 16.969, 11.139 16.969, 13.969 18.641 C 17.623 20.799, 18.558 20.039, 17.165 16.044 C 16.192 13.253, 16.352 12.799, 19.001 10.841 C 23.340 7.633, 23.362 6.413, 19.073 6.822 C 15.219 7.189, 13.498 6.016, 12.858 2.583 C 12.302 -0.393, 10.121 -0.449, 9.006 2.484 M 0 7.500 C 0 7.775, 0.225 8, 0.500 8 C 0.775 8, 1 7.775, 1 7.500 C 1 7.225, 0.775 7, 0.500 7 C 0.225 7, 0 7.225, 0 7.500"
              stroke="none"
              fill="#ff9c04"
              fillRule="evenodd"
            />
            <path d="" stroke="none" fill="#fc9c04" fillRule="evenodd" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="20"
            viewBox="0 0 22 20"
            version="1.1"
          >
            <path
              d="M 9.006 2.484 C 8.453 3.939, 8 5.525, 8 6.008 C 8 6.490, 6.088 7.023, 3.750 7.193 L -0.500 7.500 2.666 10.341 C 5.527 12.907, 5.733 13.467, 4.801 16.142 C 3.441 20.041, 4.402 20.784, 8.031 18.641 C 10.861 16.969, 11.139 16.969, 13.969 18.641 C 17.623 20.799, 18.558 20.039, 17.165 16.044 C 16.192 13.253, 16.352 12.799, 19.001 10.841 C 23.340 7.633, 23.362 6.413, 19.073 6.822 C 15.219 7.189, 13.498 6.016, 12.858 2.583 C 12.302 -0.393, 10.121 -0.449, 9.006 2.484 M 0 7.500 C 0 7.775, 0.225 8, 0.500 8 C 0.775 8, 1 7.775, 1 7.500 C 1 7.225, 0.775 7, 0.500 7 C 0.225 7, 0 7.225, 0 7.500"
              stroke="none"
              fill="#ff9c04"
              fillRule="evenodd"
            />
            <path d="" stroke="none" fill="#fc9c04" fillRule="evenodd" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="20"
            viewBox="0 0 22 20"
            version="1.1"
          >
            <path
              d="M 9.006 2.484 C 8.453 3.939, 8 5.525, 8 6.008 C 8 6.490, 6.088 7.023, 3.750 7.193 L -0.500 7.500 2.666 10.341 C 5.527 12.907, 5.733 13.467, 4.801 16.142 C 3.441 20.041, 4.402 20.784, 8.031 18.641 C 10.861 16.969, 11.139 16.969, 13.969 18.641 C 17.623 20.799, 18.558 20.039, 17.165 16.044 C 16.192 13.253, 16.352 12.799, 19.001 10.841 C 23.340 7.633, 23.362 6.413, 19.073 6.822 C 15.219 7.189, 13.498 6.016, 12.858 2.583 C 12.302 -0.393, 10.121 -0.449, 9.006 2.484 M 0 7.500 C 0 7.775, 0.225 8, 0.500 8 C 0.775 8, 1 7.775, 1 7.500 C 1 7.225, 0.775 7, 0.500 7 C 0.225 7, 0 7.225, 0 7.500"
              stroke="none"
              fill="#ff9c04"
              fillRule="evenodd"
            />
            <path d="" stroke="none" fill="#fc9c04" fillRule="evenodd" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="20"
            viewBox="0 0 22 20"
            version="1.1"
          >
            <path
              d="M 9.006 2.484 C 8.453 3.939, 8 5.525, 8 6.008 C 8 6.490, 6.088 7.023, 3.750 7.193 L -0.500 7.500 2.666 10.341 C 5.527 12.907, 5.733 13.467, 4.801 16.142 C 3.441 20.041, 4.402 20.784, 8.031 18.641 C 10.861 16.969, 11.139 16.969, 13.969 18.641 C 17.623 20.799, 18.558 20.039, 17.165 16.044 C 16.192 13.253, 16.352 12.799, 19.001 10.841 C 23.340 7.633, 23.362 6.413, 19.073 6.822 C 15.219 7.189, 13.498 6.016, 12.858 2.583 C 12.302 -0.393, 10.121 -0.449, 9.006 2.484 M 0 7.500 C 0 7.775, 0.225 8, 0.500 8 C 0.775 8, 1 7.775, 1 7.500 C 1 7.225, 0.775 7, 0.500 7 C 0.225 7, 0 7.225, 0 7.500"
              stroke="none"
              fill="#ff9c04"
              fillRule="evenodd"
            />
            <path d="" stroke="none" fill="#fc9c04" fillRule="evenodd" />
          </svg>
        </div>
        <div className="price-container">
          <span className="price">{data.price} EUR</span>
        </div>
        <div className="product-item-actions">
          <div className="cart-action">
            <button
              className={`cart-button ${isAddedToCart && "active"}`}
              title="Add product to cart"
              onClick={addToCartHandler}
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
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProductItem;
