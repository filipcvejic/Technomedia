import QuantityInput from "./QuantityInput";

import "./MiniCart.css";
import { useRef } from "react";
import RemoveFromCartButton from "./RemoveFromCartButton";

function MiniCart({ cart, onOutsideClick }) {
  const miniCartRef = useRef(null);

  onOutsideClick(miniCartRef);

  let totalAmount = 0;

  return (
    <div className="mini-cart" ref={miniCartRef}>
      <div className="mini-cart-triangle" />
      <div className="mini-cart-title">
        <span>MINI CART</span>
        {cart.length === 0 && (
          <p>You don't have products in your shopping cart</p>
        )}
      </div>
      <div className="mini-cart-items">
        {cart.map((item) => {
          totalAmount += item.product.price * item.quantity;
          return (
            <div className="single-mini-cart-item" key={item.product._id}>
              <img
                src={`http://localhost:5000/images/${
                  item.product.images[0].url.split("\\")[2]
                }`}
                alt={item.product.name}
              />
              <div className="single-item-details">
                <span>{item.product.name}</span>
                <span className="single-item-price">
                  {item.product.price} EUR
                </span>
                <div className="single-item-quantity">
                  <QuantityInput item={item} />
                  <RemoveFromCartButton item={item} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mini-cart-details">
        <div className="mini-cart-amount-details">
          <span className="cart-total-amount">
            Total: <span>{totalAmount.toFixed(2)} EUR</span>
          </span>
        </div>
        <div className="mini-cart-actions">
          <button className="payment-button" type="button">
            Continue on payment
          </button>
          <a href="/cart">View and edit cart</a>
        </div>
      </div>
    </div>
  );
}

export default MiniCart;
