import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./SearchBar.css";
import SearchItem from "./SearchItem";
import Loader from "../../shared/components/Loader";
import useLoading from "../../shared/hooks/useLoading";
import outsideClickHandler from "../utils/outsideClickHandler";

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

  outsideClickHandler(searcFormRef, () => setIsSearchResultsMenuShown(false));

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

        setFilteredProducts(data.products);
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
      navigate(`/search?q=${searchTerm}`);
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
                <a href={`/search?q=${searchTerm}`}>
                  View All (+{filteredProducts.length})
                </a>
              </div>
              <div className="search-results">
                {filteredProducts.map((product) => (
                  <SearchItem
                    data={product}
                    searchTerm={searchTerm}
                    key={product._id}
                  />
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
