import { useDispatch, useSelector } from "react-redux";
import "./CartScreen.css";
import QuantityInput from "../components/QuantityInput";
import { removeFromCart } from "../features/cart/cartApi";

function CartScreen() {
  const { cart } = useSelector((state) => state.userCart);

  const dispatch = useDispatch();

  let totalAmount = 0;

  const removeItemFromCartHandler = (event, productId) => {
    event.preventDefault();

    dispatch(removeFromCart({ productId }));
  };

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
                <button
                  className="remove-cart-item-button"
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
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                  </svg>
                </button>
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
              <span>0,00 RSD</span>
            </div>
          </div>
          <div className="purchase-amount">
            <p>Purchase amount:</p>
            <span>{totalAmount}</span>
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
