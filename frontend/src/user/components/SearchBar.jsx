import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./SearchBar.css";
import SearchItem from "./SearchItem";
import Loader from "../../shared/components/Loader";
import useLoading from "../../shared/hooks/useLoading";
import outsideClickHandler from "../utils/outsideClickHandler";
import SearchIcon from "../svgs/SearchIcon";

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
          `${import.meta.env.VITE_API_URL}/api/search/?q=${searchTerm}`
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
      navigate(`/search?q=${searchTerm}`, { replace: true });
    }
  };

  const showSearchResultsMenuHandler = () => {
    if (searchTerm.trim() !== "") {
      setIsSearchResultsMenuShown((prevValue) => !prevValue);
    }
  };

  const closeSearchBarHandler = () => {
    setIsSearchResultsMenuShown(false);
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
          <SearchIcon />
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
                <Link to={`/search?q=${searchTerm}`}>
                  View All (+{filteredProducts.length})
                </Link>
              </div>
              <div className="search-results">
                {filteredProducts.map((product) => (
                  <SearchItem
                    data={product}
                    searchTerm={searchTerm}
                    key={product._id}
                    onClose={closeSearchBarHandler}
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
