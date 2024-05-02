import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./SearchBar.css";
import SearchItem from "./SearchItem";
import Loader from "../../shared/components/Loader";
import useLoading from "../../shared/hooks/useLoading";

function SearchBar() {
  const [isSearchResultsMenuShown, setIsSearchResultsMenuShown] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const searcFormRef = useRef(null);

  const navigate = useNavigate();

  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      filterProducts(searchTerm);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  useEffect(() => {
    const outsideSearchClickHandler = (event) => {
      if (
        searcFormRef.current &&
        !searcFormRef.current.contains(event.target)
      ) {
        setIsSearchResultsMenuShown(false);
      }
    };

    document.addEventListener("mousedown", outsideSearchClickHandler);

    return () => {
      document.removeEventListener("mousedown", outsideSearchClickHandler);
    };
  }, []);

  const onChangeSearchHandler = (event) => {
    const searchTerm = event.target.value;

    setIsSearchResultsMenuShown(searchTerm !== "" ? true : false);
    setSearchTerm(searchTerm);
  };

  const filterProducts = async (searchTerm) => {
    try {
      if (searchTerm.trim() !== "") {
        const response = await fetch(
          `http://localhost:3000/api/search/?q=${searchTerm}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setFilteredProducts(data);
      } else {
        setFilteredProducts([]);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onClickSearchHandler = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/results?search=${searchTerm}`);
    }
  };

  const showSearchResultsMenuHandler = () => {
    if (searchTerm !== "") {
      setIsSearchResultsMenuShown((prevValue) => !prevValue);
    }
  };

  return (
    <div className="search-form" ref={searcFormRef}>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search product, category or brand"
          onChange={onChangeSearchHandler}
          value={searchTerm}
          onClick={showSearchResultsMenuHandler}
        />
        <button
          type="submit"
          className="search-button"
          onClick={onClickSearchHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 256 256"
            version="1.1"
          >
            <path
              d="M 91.058 2.122 C 65.365 5.099, 39.355 19.507, 22.837 39.914 C 14.934 49.676, 7.131 64.708, 3.326 77.500 C 0.873 85.744, 0.642 88.012, 0.574 104.500 C 0.488 125.406, 1.984 132.849, 9.440 148.623 C 15.342 161.107, 20.896 169.047, 30.421 178.617 C 43.497 191.754, 59.256 200.767, 77.881 205.761 C 91.053 209.292, 113.981 209.533, 127 206.276 C 136.864 203.809, 149.698 198.588, 157.112 194.026 L 162.294 190.837 192.397 220.809 C 208.954 237.294, 223.850 251.445, 225.500 252.257 C 239.600 259.193, 256 249.380, 256 234.008 C 256 231.218, 255.309 227.263, 254.464 225.218 C 253.437 222.731, 242.784 211.342, 222.299 190.829 L 191.670 160.157 195.226 153.329 C 204.127 136.240, 207.491 120.901, 206.705 101 C 205.880 80.091, 201.125 65.130, 189.880 48.062 C 172.792 22.124, 145.647 5.548, 114.500 2.032 C 104.362 0.888, 101.616 0.898, 91.058 2.122 M 89.401 36.975 C 69.053 41.291, 50.728 55.616, 41.400 74.500 C 35.575 86.291, 33.650 95.534, 34.317 108.500 C 35.643 134.278, 49.724 155.872, 72.500 167.060 C 83.494 172.460, 91.476 174.333, 103.500 174.333 C 115.626 174.333, 123.467 172.469, 135 166.845 C 141.816 163.521, 145.205 160.995, 152.103 154.100 C 159.244 146.960, 161.498 143.887, 165.375 136 C 175.405 115.594, 175.460 95.067, 165.538 74.500 C 157.711 58.275, 143.534 45.745, 126.118 39.659 C 118.690 37.063, 115.843 36.610, 105.500 36.376 C 98.900 36.227, 91.656 36.497, 89.401 36.975"
              stroke="none"
              fill="#ff7c34"
              fillRule="evenodd"
            />
            <path d="" stroke="none" fill="#fc7c34" fillRule="evenodd" />
          </svg>
        </button>
      </div>
      {isSearchResultsMenuShown && (
        <div className="search-menu-container">
          {isLoading ? (
            <Loader />
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <>
              <div className="search-menu-header">
                <span>Products ({filteredProducts.length})</span>
                <a href={`/results?search=${searchTerm}`}>
                  View All (+{filteredProducts.length})
                </a>
              </div>
              <div className="search-results">
                {filteredProducts.map((product) => (
                  <React.Fragment key={product._id}>
                    <SearchItem
                      data={product}
                      searchTerm={searchTerm}
                      key={product._id}
                    />
                    <div className="search-product-item">
                      <div className="search-product-wish-list-action">
                        <button className="search-product-wish-list-button">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            viewBox="0 0 512 512"
                            version="1.1"
                          >
                            <path
                              d=""
                              stroke="none"
                              fill="#080404"
                              fillRule="evenodd"
                            ></path>
                            <path
                              d="M 119 44.490 C 73.041 52.361, 34.848 80.464, 14.215 121.591 C 9.364 131.259, 4.729 144.658, 2.312 156 C -0.272 168.124, -0.238 199.951, 2.372 212 C 6.928 233.036, 16.542 254.898, 28.739 271.956 C 44.686 294.261, 95.066 341.588, 174.500 408.886 C 217.503 445.319, 243.085 466.138, 246.712 467.653 C 251.933 469.835, 261.977 469.384, 266.838 466.750 C 270.976 464.507, 320.961 423.252, 358 391.508 C 419.727 338.605, 466.079 294.789, 480.288 275.911 C 496.044 254.977, 506.596 231.031, 509.994 208.500 C 510.658 204.100, 511.606 199.719, 512.100 198.764 C 513.372 196.309, 513.277 166.711, 512 167.500 C 511.431 167.852, 511 166.996, 511 165.517 C 511 164.086, 510.295 159.447, 509.433 155.208 C 499.641 107.053, 462.723 65.753, 415.500 50.123 C 400.583 45.186, 392.677 43.874, 374.331 43.295 C 354.321 42.662, 343.385 44.080, 326.187 49.534 C 303.994 56.572, 287.373 66.806, 268.756 84.895 L 256 97.289 243.244 84.895 C 230.040 72.065, 221.943 66.042, 207.764 58.499 C 197.396 52.983, 178.427 46.650, 166.074 44.580 C 154.711 42.675, 129.870 42.628, 119 44.490 M 120.192 90.987 C 85.795 98.988, 57.772 126.022, 48.861 159.802 C 46.250 169.699, 45.370 187.227, 46.937 198.122 C 49.219 213.988, 55.976 230.560, 66.049 245 C 80.145 265.206, 146.463 325.918, 235.251 399.898 L 256.002 417.188 273.751 402.384 C 344.915 343.024, 388.879 304.152, 420.609 272.537 C 446.494 246.746, 454.039 236.026, 460.961 215.211 C 466.670 198.042, 467.490 176.307, 463.062 159.500 C 453.973 125.001, 424.670 97.694, 389.001 90.485 C 377.268 88.113, 354.718 88.846, 344.067 91.945 C 334.888 94.617, 323.971 99.601, 316.308 104.620 C 313.113 106.712, 301.500 117.261, 290.500 128.062 C 279.500 138.863, 268.987 148.480, 267.137 149.434 C 261.913 152.128, 254.160 152.546, 247.913 150.471 C 243.160 148.893, 240.227 146.410, 222.027 128.564 C 200.827 107.777, 195.008 103.184, 182.625 97.462 C 169.244 91.280, 162.237 89.800, 144.500 89.408 C 131.323 89.117, 127.034 89.396, 120.192 90.987 M 0.405 183.500 C 0.406 192.300, 0.559 195.766, 0.745 191.203 C 0.930 186.639, 0.929 179.439, 0.742 175.203 C 0.555 170.966, 0.404 174.700, 0.405 183.500"
                              stroke="none"
                              fill="#040404"
                              fillRule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                      <a
                        href={`/it-gaming/laptops/everyday-laptops/hp-laptop-pavilion-gaming-15-dk2039nm`}
                      >
                        <span className="search-product-image-container">
                          <img
                            className="search-product-image-photo"
                            src="http://localhost:5000/images/56726a2c-9d2a-4285-b0da-9b1b97be68ba_.png"
                            alt="HP Laptop Pavilion Gaming 15-dk2039nm"
                          />
                        </span>
                      </a>
                      <div className="search-product-item-details">
                        <strong className="search-product-item-name">
                          <a
                            href={`/it-gaming/laptops/everyday-laptops/hp-laptop-pavilion-gaming-15-dk2039nm`}
                          >
                            HP Laptop Pavilion Gaming 15-dk2039nm
                          </a>
                        </strong>
                      </div>
                      <div className="search-product-price-container">
                        <span className="search-product-price">
                          1699.99 EUR
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </>
          ) : (
            <div className="search-no-results-container">
              <div className="no-results-found">
                <p>{`😔 We're sorry, we can't find "${searchTerm}".`}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
