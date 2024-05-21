import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductItem from "../components/ProductItem";

import "./SearchResultsScreen.css";
import { toast } from "react-toastify";
import SpecificationsFilterList from "../components/SpecificationsFilterList";
import BrandFilterList from "../components/BrandFilterList";
import GroupFilterList from "../components/GroupFilterList";
import PriceRangeSlider from "../components/PriceRangeSlider";
import SortButton from "../components/SortButton";
import FilteredProductsList from "../components/FilteredProductsList";

function SearchResultsScreen() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("q").toString();

  useEffect(() => {
    const currentParams = searchParams.toString();

    const getSearchResults = async () => {
      try {
        const response = await fetch(
          `https://technomedia-5gpn.onrender.com/api/search?${currentParams}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setSearchResults(data);
      } catch (err) {
        toast.error(err.message);
      }
    };

    getSearchResults();
  }, [searchParams]);

  return (
    <>
      {searchResults.products && searchResults.products.length > 0 ? (
        <div className="products-search-page">
          <ul className="breadcrumbs">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>Search results for: "{searchTerm}"</li>
          </ul>
          <div className="search-products-container">
            <div className="search-info">
              <h2>
                Search results for: <span>"{searchTerm}"</span>
                <span className="number-of-results">
                  {searchResults.products.length}{" "}
                  {searchResults.products.length > 1 ? "products" : "product"}
                </span>
              </h2>
              <SortButton additionalOptions={["Closest to the search term"]} />
            </div>
            <div className="search-products">
              <div className="search-products-filter-container">
                <GroupFilterList groups={searchResults?.groups} />
                <BrandFilterList brands={searchResults?.brands} />
                <PriceRangeSlider
                  minPrice={searchResults?.minPrice}
                  maxPrice={searchResults?.maxPrice}
                  label={"price"}
                />
                <SpecificationsFilterList products={searchResults?.products} />
              </div>
              <FilteredProductsList products={searchResults?.products} />
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
