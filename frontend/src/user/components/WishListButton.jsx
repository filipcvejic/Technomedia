import React from "react";
import HeartIcon from "../svgs/HeartIcon";
import { useWishListActions } from "../hooks/useWishListActions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function WishListButton({ exists, product }) {
  const { addToWishList, removeFromWishList } = useWishListActions();

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userAuth);

  const addProductToWishListHandler = (event) => {
    event.preventDefault();

    if (!userInfo) {
      return navigate("/login");
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
