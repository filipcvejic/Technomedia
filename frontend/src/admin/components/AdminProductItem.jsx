import React from "react";

import "./AdminProductItem.css";

function AdminProductItem({ data }) {
  console.log(data);

  return (
    <div className="admin-product-item-wrapper">
      <div className="admin-product-item">
        <span className="admin-product-image-container">
          <img
            className="admin-product-image-photo"
            src={`http://localhost:5000/images/${
              data.images[0].url.split("\\")[2]
            }`}
            alt={data.name}
          />
        </span>
        <div className="admin-product-item-details">
          <strong className="admin-product-item-name">
            <span>{data.name}</span>
          </strong>
          <div className="admin-product-item-ratings">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
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
              width="15"
              height="15"
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
              width="15"
              height="15"
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
              width="15"
              height="15"
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
              width="15"
              height="15"
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
          <div className="admin-product-price-container">
            <span className="admin-product-price">{data.price} EUR</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProductItem;