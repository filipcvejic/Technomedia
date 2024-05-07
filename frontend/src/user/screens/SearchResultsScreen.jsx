import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductItem from "../components/ProductItem";

import "./SearchResultsScreen.css";
import { toast } from "react-toastify";
import SpecificationsFilterList from "../components/SpecificationsFilterList";
import BrandFilterList from "../components/BrandFilterList";
import CategoryFilterList from "../components/CategoryFilterList";
import PriceRangeSlider from "../components/PriceRangeSlider";

function SearchResultsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 512 512"
      version="1.1"
    >
      <path
        d="M 13.637 118.465 C 2.282 122.513, -3.152 136.382, 2.065 148 C 5.013 154.566, 240.434 389.987, 247 392.935 C 252.729 395.508, 259.271 395.508, 265 392.935 C 268.515 391.357, 295.593 364.814, 388.671 271.707 C 517.979 142.359, 513 147.763, 513 136.754 C 513 134.074, 512.632 132.110, 512.182 132.388 C 511.732 132.666, 510.816 131.381, 510.148 129.533 C 507.626 122.558, 498.650 116.987, 490 117.028 C 481.432 117.068, 482.734 115.855, 366.750 231.787 L 256 342.488 145.250 231.787 C 58.951 145.527, 33.507 120.640, 30 119.065 C 24.782 116.721, 19.111 116.513, 13.637 118.465 M 0.310 138.500 C 0.315 141.800, 0.502 143.029, 0.725 141.232 C 0.947 139.435, 0.943 136.735, 0.715 135.232 C 0.486 133.729, 0.304 135.200, 0.310 138.500"
        stroke="none"
        fill="#040404"
        fillRule="evenodd"
      />
    </svg>
  );

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const term = searchParams.get("search");
        const searchTerm = term ? term.trim() : "";
        setSearchTerm(searchTerm);

        if (searchTerm !== "") {
          const response = await fetch(
            `http://localhost:3000/api/search/?q=${searchTerm}`
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message);
          }

          setSearchResults(data);
        } else {
          navigate("/");
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    getSearchResults();
  }, [location.search]);

  return (
    <>
      {searchResults && searchResults.length > 0 ? (
        <div className="products-search-page">
          <ul className="breacrumbs">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>

          <div className="search-products-container">
            <div className="search-info">
              <h2>
                Search results for: <span>"{searchTerm}"</span>
                <span className="number-of-results">
                  {searchResults.length}{" "}
                  {searchResults.length > 1 ? "products" : "product"}
                </span>
              </h2>
              <div className="sort-container">
                <span>Sort by:</span>
                <select className="sort-button">
                  <option value="">Popularnosti</option>
                  <option value="">Ceni nanize</option>
                  <option value="">Ceni navise</option>
                </select>
              </div>
            </div>
            <div className="search-products">
              <div className="search-products-filter-container">
                <CategoryFilterList searchResults={searchResults} icon={icon} />
                <BrandFilterList searchResults={searchResults} icon={icon} />
                <PriceRangeSlider products={searchResults} />
                <SpecificationsFilterList
                  searchResults={searchResults}
                  icon={icon}
                />
              </div>
              <div className="filtered-products-list">
                {searchResults?.map((product) => (
                  <ProductItem data={product} key={product._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
}

export default SearchResultsScreen;
