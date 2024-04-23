import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";

import "./ProductScreen.css";
import { toast } from "react-toastify";

function ProductScreen() {
  const [product, setProduct] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const params = useParams();

  useEffect(() => {
    const getProductData = async () => {
      const { categoryName, subcategoryName, groupName, productName } = params;

      try {
        const response = await fetch(
          `/api/product/${categoryName}/${subcategoryName}/${groupName}/${productName}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setProduct(data.foundProduct);
        setSimilarProducts(data.similarProducts);
      } catch (err) {
        toast.error(err?.message);
      }
    };
    getProductData();
  }, [params]);

  const changeMainImageHandler = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      {product && (
        <div className="product-page">
          <ul className="breadcrumbs">
            <li>
              <Link to="/">Home</Link>
            </li>
            {product.category && (
              <li>
                <Link to={`/${product.category.slug}`}>
                  {product.category.name}
                </Link>
              </li>
            )}
            {product.subcategory && (
              <li>
                <Link
                  to={`/${product.category.slug}/${product.subcategory.slug}`}
                >
                  {product.subcategory.name}
                </Link>
              </li>
            )}
            {product.group && (
              <li>
                <Link
                  to={`/${product.category.slug}/${product.subcategory.slug}/${product.group.slug}`}
                >
                  {product.group.name}
                </Link>
              </li>
            )}
            {product.name && <li>{product.name}</li>}
          </ul>

          <div className="product-details">
            <div className="product-images">
              <div className="image-thumbnails">
                <div className="image-thumbnails">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`image-thumbnail ${
                        index === activeIndex ? "active" : ""
                      }`}
                      onClick={() => changeMainImageHandler(index)}
                    >
                      <img
                        src={`http://localhost:5000/images/${
                          image.url.split("\\")[2]
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="main-image">
                <img
                  src={`http://localhost:5000/images/${
                    product.images[activeIndex].url.split("\\")[2]
                  }`}
                />
              </div>
            </div>
            <div className="product-overview">
              <div className="product-state">
                <span className="availability-text">In stock</span>
              </div>
              <div className="product-name">{product.name}</div>
              <div className="product-price">
                <div className="price-value">
                  <div className="main-price">
                    <span>{product.price} EUR</span>
                  </div>
                  <div className="monthly-payment">
                    <span className="monthly-price">
                      {(product.price / 24).toFixed(2)} EUR <span>/month</span>
                    </span>
                  </div>
                </div>
                <div className="price-note">
                  <p>
                    The displayed discounted price is valid for online purchases
                    as well as for cash payment purchases in stores.
                  </p>
                </div>
              </div>
              <div className="product-actions">
                <button className="buy-now-button">BUY NOW</button>
                <button className="add-to-cart-button">
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
                    <path
                      d=""
                      stroke="none"
                      fill="#fcfcfc"
                      fillRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="free-delivery-wrapper">
            <div className="free-delivery-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 512 512"
                version="1.1"
              >
                <path d="" stroke="none" fill="#097a00" fillRule="evenodd" />
                <path
                  d="M 55.450 79.407 C 49.128 82.161, 44.126 91.456, 45.600 97.713 C 46.712 102.429, 49.720 106.474, 53.837 108.788 L 57.772 111 185.886 111 L 314 111 314.022 168.750 C 314.043 222.906, 314.160 226.755, 315.905 230.599 C 316.929 232.853, 319.282 235.778, 321.133 237.099 L 324.500 239.500 390.196 239.771 L 455.893 240.042 467.446 254.931 L 479 269.820 479 311.410 L 479 353 464 353 C 449.934 353, 449 352.882, 449 351.102 C 449 347.749, 440.243 331.670, 435.458 326.237 C 420.174 308.884, 395.967 300.758, 373.646 305.487 C 351.536 310.171, 332.767 326.601, 325.368 347.750 L 323.531 353 276.343 353 L 229.155 353 227.948 349.250 C 222.567 332.542, 210.735 318.986, 194.500 310.931 C 169.470 298.513, 140.391 303.415, 120.435 323.418 C 112.948 330.923, 108.068 338.495, 105.114 347.196 L 103.312 352.500 79.906 353 C 59.484 353.436, 56.112 353.735, 53.454 355.345 C 44.759 360.612, 42.875 373.004, 49.670 380.235 C 54.723 385.612, 56.846 386, 81.227 386 L 103.518 386 105.828 392.442 C 111.959 409.535, 128.220 424.824, 146.371 430.557 C 162.954 435.796, 178.803 434.582, 194.891 426.843 C 206.469 421.273, 218.004 409.910, 223.667 398.495 C 225.851 394.093, 227.903 389.481, 228.226 388.245 L 228.813 386 276.309 386 L 323.806 386 326.273 392.385 C 330.497 403.315, 340.285 415.809, 349.558 422.106 C 361.421 430.162, 372.086 433.380, 387 433.403 C 397.289 433.419, 399.408 433.100, 407.118 430.375 C 417.685 426.640, 428.270 419.749, 435.049 412.192 C 439.607 407.110, 449 390.317, 449 387.251 C 449 386.411, 456.229 386.012, 475.330 385.797 L 501.660 385.500 505.331 382.698 C 512.298 377.381, 512 380.333, 512 316.715 L 512 259.332 508.203 253.916 C 506.114 250.937, 498.706 241.211, 491.741 232.303 L 479.076 216.106 454.612 167.244 C 438.429 134.922, 429.076 117.334, 426.982 115.287 C 425.232 113.576, 421.870 111.701, 419.465 111.096 C 416.736 110.408, 402.452 110, 381.146 110 L 347.177 110 346.838 99.250 C 346.541 89.813, 346.207 88.089, 344.099 85.133 C 342.778 83.282, 339.853 80.929, 337.599 79.905 C 333.665 78.119, 327.976 78.045, 196 78.061 C 83.903 78.075, 57.937 78.324, 55.450 79.407 M 347 174.985 L 347 207 392 207 C 416.750 207, 436.978 206.662, 436.950 206.250 C 436.923 205.838, 429.836 191.550, 421.200 174.500 L 405.500 143.500 376.250 143.235 L 347 142.970 347 174.985 M 37.469 145.062 C 33.407 146.244, 28.382 151.311, 26.941 155.680 C 24.638 162.658, 27.063 169.717, 33.385 174.438 C 36.105 176.470, 37.209 176.504, 108.823 176.792 C 148.795 176.952, 182.949 176.821, 184.721 176.502 C 189.233 175.687, 194.565 170.328, 195.939 165.226 C 198.223 156.743, 192.923 147.460, 184.453 145.109 C 179.611 143.764, 42.080 143.721, 37.469 145.062 M 7.949 210.255 C 6.078 211.516, 3.485 214.112, 2.185 216.024 C 0.210 218.931, -0.111 220.444, 0.226 225.263 C 0.714 232.231, 2.938 235.642, 9.020 238.750 L 13.424 241 84.962 240.978 C 152.565 240.957, 156.725 240.854, 160.599 239.095 C 166.316 236.498, 169.308 231.930, 169.788 225.065 C 170.219 218.892, 168.125 214.629, 162.677 210.592 C 159.880 208.519, 159.166 208.498, 85.603 208.231 L 11.351 207.963 7.949 210.255 M 37.914 271.956 C 26.976 275.270, 22.618 288.566, 29.508 297.600 C 34.469 304.103, 34.393 304.094, 80.971 303.781 C 121.486 303.509, 122.946 303.433, 125.616 301.438 C 130.946 297.457, 132.500 294.351, 132.500 287.677 C 132.500 280.172, 129.825 275.733, 123.599 272.905 C 119.815 271.187, 116.467 271.049, 80 271.108 C 58.275 271.143, 39.336 271.525, 37.914 271.956 M 158.734 338.030 C 152.581 339.575, 147.674 342.546, 143.129 347.476 C 126.197 365.845, 135.681 395.013, 160.198 399.969 C 174.388 402.837, 188.707 395.434, 194.827 382.067 C 202.442 365.437, 194.904 346.667, 177.744 339.530 C 172.969 337.544, 163.609 336.805, 158.734 338.030 M 378.929 338.308 C 354.886 345.103, 347.072 373.437, 364.336 391.227 C 376.743 404.012, 399.077 403.342, 410.493 389.843 C 424.232 373.595, 418.693 348.387, 399.519 339.905 C 393.836 337.391, 384.685 336.682, 378.929 338.308"
                  stroke="none"
                  fill="#097a00"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <div className="free-delivery-text">
              Free delivery on the territory of Serbia!
            </div>
          </div>
          <div className="similar-products-container">
            <h2>Similar products</h2>
            <div className="similar-products">
              {similarProducts?.map((similarProduct) => (
                <ProductItem data={similarProduct} key={similarProduct._id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductScreen;