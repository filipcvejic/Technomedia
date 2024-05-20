import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SortButton from "../components/SortButton";
import { useWishListActions } from "../hooks/useWishListActions";
import { useSelector } from "react-redux";
import ProductItem from "../components/ProductItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./WishListScreen.css";

function WishListScreen() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredItems, setFilteredItems] = useState([]);
  const { wishList } = useSelector((state) => state.userWishList);

  const { moveAllToCart } = useWishListActions();
  const navigate = useNavigate();

  const sortWishListByPriceHandler = (items, sortOrder) => {
    switch (sortOrder) {
      case "Price low to high":
        return items.slice().sort((a, b) => a.price - b.price);
      case "Price high to low":
        return items.slice().sort((a, b) => b.price - a.price);
      default:
        return items;
    }
  };

  useEffect(() => {
    if (wishList.length > 0) {
      const params = new URLSearchParams(searchParams);
      const sortOrder = params.get("sort");

      if (sortOrder === "Popularity") {
        setFilteredItems(wishList);
      } else {
        const sortedItems = sortWishListByPriceHandler(wishList, sortOrder);
        setFilteredItems(sortedItems);
      }
    }
  }, [searchParams, wishList]);

  const moveAllToCartHandler = (event) => {
    event.preventDefault();

    if (wishList.length > 0) {
      moveAllToCart(wishList);
    }
    navigate("/cart");
  };

  return (
    <div className="wish-list-page">
      <ul className="breadcrumbs">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>Wish list</li>
      </ul>
      <div className="wish-list-header">
        <h1>Wish list</h1>
        <SortButton additionalOptions={["Popularity"]} />
      </div>
      <div className="wish-list-products">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <ProductItem data={item} key={index} />
          ))
        ) : (
          <p className="wish-list-not-found-label">
            No products found in your wish list.
          </p>
        )}
      </div>
      <div className="wish-list-actions">
        <button
          className="move-products-to-cart-button"
          onClick={moveAllToCartHandler}
        >
          Add all to cart
        </button>
        <a href="/wish-list" className="update-wish-list-button">
          Update wish list
        </a>
      </div>
    </div>
  );
}

export default WishListScreen;
