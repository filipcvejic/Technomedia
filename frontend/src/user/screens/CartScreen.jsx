import { useSelector } from "react-redux";
import "./CartScreen.css";
import QuantityInput from "../components/QuantityInput";

import RemoveFromCartButton from "../components/RemoveFromCartButton";
import OrderButton from "../components/OrderButton";
import { Link } from "react-router-dom";

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
                <Link
                  className="cart-item-link"
                  to={`/${item.product.category.slug}/${item.product.subcategory.slug}/${item.product.group.slug}/${item.product.slug}`}
                >
                  <img src={item.product?.images[0].url} />
                </Link>
                <div className="cart-item-details">
                  <Link
                    to={`/${item.product.category.slug}/${item.product.subcategory.slug}/${item.product.group.slug}/${item.product.slug}`}
                    className="cart-item-name"
                  >
                    {item.product.name}
                  </Link>
                  <div className="cart-item-quantity">
                    <QuantityInput item={item} />
                    <span className="cart-item-price">
                      {item.product?.price} EUR
                    </span>
                  </div>
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
          <div className="order-price-details">
            <div className="online-price">
              <p>Price for online payment:</p>
              <span>{totalAmount.toFixed(2)} EUR</span>
            </div>
            <div className="online-discount">
              <p>Discount:</p>
              <span>0,00 EUR</span>
            </div>
          </div>
          <div className="purchase-amount">
            <p>Purchase amount:</p>
            <span>{totalAmount.toFixed(2)} EUR</span>
          </div>
          <OrderButton data={cart} label={"BUY NOW"} />
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
