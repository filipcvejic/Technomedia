import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./SearchResultsScreen.css";
import { toast } from "react-toastify";
import SpecificationsFilterList from "../components/SpecificationsFilterList";
import BrandFilterList from "../components/BrandFilterList";
import GroupFilterList from "../components/GroupFilterList";
import PriceRangeSlider from "../components/PriceRangeSlider";
import SortButton from "../components/SortButton";
import FilteredProductsList from "../components/FilteredProductsList";
import FilterProductsButton from "../components/FilterProductsButton";

function SearchResultsScreen() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("q").toString();

  useEffect(() => {
    const currentParams = searchParams.toString();

    const getSearchResults = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/search?${currentParams}`
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

  const searchFilters = (
    <>
      <GroupFilterList groups={searchResults?.groups} />
      <BrandFilterList brands={searchResults?.brands} />
      <PriceRangeSlider
        minPrice={searchResults?.minPrice}
        maxPrice={searchResults?.maxPrice}
        label={"price"}
      />
      <SpecificationsFilterList products={searchResults?.products} />
    </>
  );

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
              <div className="desktop-sort-button-wrapper">
                <SortButton additionalOptions={["Popularity"]} />
              </div>
              <div className="mobile-products-actions">
                <div className="mobile-filter-button-wrapper">
                  <FilterProductsButton filters={searchFilters} />
                </div>
                <div className="mobile-sort-button-wrapper">
                  <SortButton
                    additionalOptions={["Popularity"]}
                    isMobile={true}
                  />
                </div>
              </div>
            </div>
            <div className="search-products">
              <div className="search-products-filter-container">
                {searchFilters}
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
