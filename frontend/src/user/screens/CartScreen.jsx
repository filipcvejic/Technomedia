import { useSelector } from "react-redux";
import "./CartScreen.css";
import QuantityInput from "../components/QuantityInput";

import RemoveFromCartButton from "../components/RemoveFromCartButton";

function CartScreen() {
  const { cart } = useSelector((state) => state.userCart);

  let totalAmount = 0;

  return (
    <div className="cart-container">
      <div className="cart-content">
        <h1 className="cart-content-title">Your cart</h1>
        <div className="cart-items">
          {cart.map((item) => {
            totalAmount += item.product?.price * item.quantity;
            return (
              <div className="cart-item" key={item.product?._id}>
                <img
                  src={`http://localhost:5000/images/${
                    item.product?.images[0].url.split("\\")[2]
                  }`}
                />
                <p className="cart-item-name">{item.product.name}</p>
                <div className="cart-item-details">
                  <QuantityInput item={item} />
                  <span>{item.product?.price} EUR</span>
                </div>
                <RemoveFromCartButton item={item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="order-informations">
        <div className="order-review">
          <h1 className="order-review-title">Order review</h1>
          <div className="orded-price-details">
            <div className="online-price">
              <p>Price for online payment:</p>
              <span>{totalAmount} EUR</span>
            </div>
            <div className="online-discount">
              <p>Discount:</p>
              <span>0,00 EUR</span>
            </div>
          </div>
          <div className="purchase-amount">
            <p>Purchase amount:</p>
            <span>{totalAmount} EUR</span>
          </div>
          <button className="order-button">Order</button>
        </div>
        <div className="promo-code-container">
          <h1 className="promo-code-title">Promo code</h1>
          <div className="promo-code-form">
            <input />
            <button type="button" className="promo-code-button">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
