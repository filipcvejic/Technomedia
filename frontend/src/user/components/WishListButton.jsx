import React from "react";
import HeartIcon from "../svgs/HeartIcon";
import { useWishListActions } from "../hooks/useWishListActions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function WishListButton({ exists, product, onCloseSearch }) {
  const { addToWishList, removeFromWishList } = useWishListActions();

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userAuth);

  const addProductToWishListHandler = (event) => {
    event.preventDefault();

    if (!userInfo) {
      if (onCloseSearch) {
        onCloseSearch();
      }
      navigate("/login", { replace: true });
      return;
    }

    if (exists) {
      removeFromWishList(product._id);
    } else {
      addToWishList(product);
    }
  };

  return (
    <button className="wish-list-button" onClick={addProductToWishListHandler}>
      <HeartIcon exists={exists} />
    </button>
  );
}

export default WishListButton;
