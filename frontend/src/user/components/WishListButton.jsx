import React from "react";
import HeartIcon from "../svgs/HeartIcon";
import { useWishListActions } from "../hooks/useWishListActions";

function WishListButton({ exists, product }) {
  const { addToWishList, removeFromWishList } = useWishListActions();

  return (
    <button
      className="wish-list-button"
      onClick={() =>
        exists ? removeFromWishList(product._id) : addToWishList(product)
      }
    >
      <HeartIcon exists={exists} />
    </button>
  );
}

export default WishListButton;
