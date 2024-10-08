import QuantityInput from "./QuantityInput";

import "./MiniCart.css";
import { useRef } from "react";
import RemoveFromCartButton from "./RemoveFromCartButton";
import OrderButton from "./OrderButton";
import { normalizePath } from "../../shared/utils/normalizePath";
import { Link } from "react-router-dom";

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
        {Object.keys(cart).length > 0 &&
          cart?.map((item) => {
            totalAmount += item.product.price * item.quantity;
            return (
              <div className="single-mini-cart-item" key={item.product._id}>
                <img src={item.product.images[0].url} alt={item.product.name} />
                <div className="single-item-details">
                  <Link
                    className="item-link"
                    to={`/${item.product.category.slug}/${item.product.subcategory.slug}/${item.product.group.slug}/${item.product.slug}`}
                  >
                    <span>{item.product.name}</span>
                    <span className="single-item-price">
                      {item.product.price} EUR
                    </span>
                  </Link>
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
          <OrderButton data={cart} label={"Continue on payment"} />
          <Link to={"/cart"}>View and edit cart</Link>
        </div>
      </div>
    </div>
  );
}

export default MiniCart;
