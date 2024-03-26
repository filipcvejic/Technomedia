import { useSelector } from "react-redux";
import "./CartScreen.css";
import QuantityInput from "../components/QuantityInput";

function CartScreen() {
  const { cart } = useSelector((state) => state.userCart);

  console.log(cart);

  return (
    <div className="cart-container">
      <div className="cart-content">
        <h1 className="cart-content-title">Your cart</h1>
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.product._id}>
              <img src={`http://localhost:5000/images/${item.product.image}`} />
              <p className="cart-item-description">
                Laptop HP 15s-fq0002nm N4120/4/256 9J2W7EA Intel Celeron N4120
                do 2.60 GHz, 15.6", Integrisana UHD 600, 4GB
              </p>
              <div className="cart-item-details">
                <QuantityInput item={item} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="order-review">
        <h1 className="order-review-title">Order review</h1>
        <div className="orded-price-details">
          <div className="online-price">
            <p>Price for online payment:</p>
            <span>58.318,00 RSD</span>
          </div>
          <div className="online-discount">
            <p>Discount:</p>
            <span>0,00 RSD</span>
          </div>
        </div>
        <div className="purchase-amount">
          <p>Purchase amount:</p>
          <span>58.318,00</span>
        </div>
        <button className="order-button">Order</button>
      </div>
    </div>
  );
}

export default CartScreen;
