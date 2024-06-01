import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";

import "./ProductScreen.css";
import { toast } from "react-toastify";
import SpecificationsContainer from "../components/SpecificationsContainer";
import AddToCartButton from "../components/AddToCartButton";
import DeclarationContainer from "../components/DeclarationContainer";
import DescriptionContainer from "../components/DescriptionContainer";
import OrderButton from "../components/OrderButton";

function ProductScreen() {
  const [product, setProduct] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const params = useParams();

  useEffect(() => {
    const getProductData = async () => {
      const { categoryName, subcategoryName, groupName, productName } = params;

      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/product/${categoryName}/${subcategoryName}/${groupName}/${productName}`,
          {
            credentials: "include",
          }
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
    setActiveImageIndex(index);
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

          <div className="product-info-container">
            <div className="product-images">
              <div className="image-thumbnails">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`image-thumbnail ${
                      index === activeImageIndex ? "active" : ""
                    }`}
                    onClick={() => changeMainImageHandler(index)}
                  >
                    <img
                      src={`${import.meta.env.VITE_API_URL}/images/${
                        image.url.split("\\")[2]
                      }`}
                    />
                  </div>
                ))}
              </div>
              <div className="main-image">
                <img
                  src={`${import.meta.env.VITE_API_URL}/images/${
                    product.images[activeImageIndex].url.split("\\")[2]
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
                <OrderButton data={product} label={"BUY NOW"} />
                <AddToCartButton data={product} />
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
          <div className="product-details-container">
            <div className="product-main-specifications">
              <p className="single-main-specification">
                <span>EAN:</span> {product._id}
              </p>
              {product.specifications.slice(0, 5).map((spec, index) => (
                <p className="single-main-specification" key={index}>
                  <span>{spec.type}:</span> {spec.value}
                </p>
              ))}
            </div>
            <div className="product-specifications-declaration-container">
              <SpecificationsContainer product={product} />
              <DescriptionContainer description={product.description} />
              <DeclarationContainer product={product} />
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
