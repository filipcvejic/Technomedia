import React from "react";
import "./SearchItem.css";
import WishListButton from "./WishListButton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SearchItem({ data, searchTerm, onClose }) {
  const { wishList } = useSelector((state) => state.userWishList);

  const isProductExistsInWishList = wishList.some(
    (product) => product._id === data._id
  );

  const formatProductName = (productName, searchTerm) => {
    const searchWords = searchTerm.trim().split(/\s+/);
    const regex = new RegExp(`(${searchWords.join("|")}\\s*|\\s+)`, "gi");
    const parts = productName.split(regex);

    return parts.map((part, index) => {
      const isSearchWord = searchWords.some((word) =>
        new RegExp(word, "gi").test(part)
      );

      const style = {
        color: isSearchWord ? "#FF5C00" : "black",
        fontWeight: isSearchWord ? "bolder" : "normal",
      };

      return (
        <span key={index} style={style}>
          {part}
        </span>
      );
    });
  };

  return (
    <div className="search-product-item" key={data._id}>
      <div className="search-product-wish-list-action">
        <WishListButton
          exists={isProductExistsInWishList}
          product={data}
          onCloseSearch={onClose}
        />
      </div>
      <Link
        to={`/${data.category.slug}/${data.subcategory.slug}/${data.group.slug}/${data.slug}`}
      >
        <span className="search-product-image-container">
          <img
            className="search-product-image-photo"
            src={data.images[0].url}
            alt={data.name}
          />
        </span>
      </Link>
      <div className="search-product-item-details">
        <strong className="search-product-item-name">
          <Link
            to={`/${data.category.slug}/${data.subcategory.slug}/${data.group.slug}/${data.slug}`}
          >
            {formatProductName(data.name, searchTerm)}
          </Link>
        </strong>
      </div>
      <div className="search-product-price-container">
        <span className="search-product-price">{data.price} EUR</span>
      </div>
    </div>
  );
}
