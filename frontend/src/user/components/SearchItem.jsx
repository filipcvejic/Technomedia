import React from "react";
import "./SearchItem.css";
import WishListButton from "./WishListButton";
import { useSelector } from "react-redux";

export default function SearchItem({ data, searchTerm }) {
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
        <WishListButton exists={isProductExistsInWishList} product={data} />
      </div>
      <a
        href={`/${data.category.slug}/${data.subcategory.slug}/${data.group.slug}/${data.slug}`}
      >
        <span className="search-product-image-container">
          <img
            className="search-product-image-photo"
            src={`${import.meta.env.VITE_API_URL}/images/${
              data.images[0].url.split("\\")[2]
            }`}
            alt={data.name}
          />
        </span>
      </a>
      <div className="search-product-item-details">
        <strong className="search-product-item-name">
          <a
            href={`/${data.category.slug}/${data.subcategory.slug}/${data.group.slug}/${data.slug}`}
          >
            {formatProductName(data.name, searchTerm)}
          </a>
        </strong>
      </div>
      <div className="search-product-price-container">
        <span className="search-product-price">{data.price} EUR</span>
      </div>
    </div>
  );
}
