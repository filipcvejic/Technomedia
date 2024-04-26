import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../features/cart/cartApi";
import QuantityInput from "./QuantityInput";
import { Link } from "react-router-dom";

import "./MiniCart.css";

function MiniCart({ cart }) {
  const dispatch = useDispatch();

  const removeItemFromCartHandler = (event, productId) => {
    event.preventDefault();
    dispatch(removeFromCart({ productId }));
  };

  let totalAmount = 0;

  return (
    <div className="mini-cart">
      <div className="mini-cart-triangle" />
      <div className="mini-cart-title">
        <span>MINI CART</span>
        {!cart.length > 0 && (
          <p>You don't have products in your shopping cart</p>
        )}
      </div>
      <div className="mini-cart-items">
        {cart?.map((item) => {
          console.log(item.product);

          totalAmount += item.product.price * item.quantity;
          return (
            <div className="single-mini-cart-item" key={item.product._id}>
              <img
                src={`http://localhost:5000/images/${
                  item.product.images[0].url.split("\\")[2]
                }`}
              />
              <div className="single-item-details">
                <span>{item.product.name}</span>
                <span className="single-item-price">
                  {item.product.price} EUR
                </span>
                <div className="single-item-quantity">
                  <QuantityInput item={item} />
                  <button
                    className="remove-item-button"
                    onClick={(event) =>
                      removeItemFromCartHandler(event, item.product?._id)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      fill="black"
                      className="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mini-cart-details">
        <div className="mini-cart-amount-details">
          <span className="cart-total-amount">
            Total: <span>{totalAmount} EUR</span>
          </span>
        </div>
        <div className="mini-cart-actions">
          <button className="payment-button" type="button">
            Continue on payment
          </button>
          <Link to="/cart">View and edit cart</Link>
        </div>
      </div>
    </div>
  );
}

export default MiniCart;
