import React from "react";
import { Link } from "react-router-dom";
import Card from "../../shared/components/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decreaseProductQuantity,
} from "../features/cart/cartApi";
import "./ProductItem.css";
import { addToCartForGuest } from "../features/cart/cartSlice";

function ProductItem({ data }) {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userAuth);

  const addToCartHandler = async (e) => {
    e.preventDefault();

    if (userInfo) {
      dispatch(
        addToCart({
          product: data._id,
          name: data.name,
          description: data.description,
          price: data.price,
          image: data.image,
          category: data.category._id,
          subcategory: data.subcategory._id,
        })
      );
    } else {
      dispatch(
        addToCartForGuest({
          product: data._id,
          name: data.name,
          description: data.description,
          price: data.price,
          image: data.image,
          category: data.category._id,
          subcategory: data.subcategory._id,
        })
      );
    }
  };

  const removeFromCartHandler = async (e) => {
    e.preventDefault();

    await dispatch(removeFromCart(data._id));
  };

  const decreaseProductQuantityHandler = async (e) => {
    e.preventDefault();

    await dispatch(
      decreaseProductQuantity({ productId: data._id, quantity: "3" })
    );
  };

  return (
    <Card>
      <Link to={`/product/${data._id}`}>
        <span className="product-image-container">
          <img
            className="product-image-photo"
            src={`http://localhost:5000/images/${data.image}`}
            alt={data.name}
          />
        </span>
      </Link>
      <div className="product-item-details">
        <strong className="product-item-name">
          <Link to={`/product/${data._id}`}>{data.name}</Link>
        </strong>
        <div className="price-container">
          <span className="price">{data.price} EUR</span>
        </div>
        <div className="product-item-actions">
          <div className="cart-action">
            <button
              className="cart-button"
              title="Add product to cart"
              onClick={addToCartHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="white"
                className="bi bi-cart-icon"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ProductItem;
