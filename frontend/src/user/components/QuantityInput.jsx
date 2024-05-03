import { useDispatch, useSelector } from "react-redux";
import "./QuantityInput.css";
import { decreaseProductQuantity } from "../features/cart/cartApi";
import useAddToCart from "../hooks/useAddToCart";

export default function QuantityInput({ item }) {
  const dispatch = useDispatch();

  const addToCartHandler = useAddToCart();

  const increaseQuantityHandler = (event) => {
    event.preventDefault();

    addToCartHandler(item.product);
  };

  const decreaseQuantityHandler = (event) => {
    event.preventDefault();

    dispatch(
      decreaseProductQuantity({
        productId: item.product?._id,
      })
    );
  };

  return (
    <div className="quantity-input">
      <button
        className="quantity-count-minus"
        data-action="minus"
        type="button"
        onClick={decreaseQuantityHandler}
      >
        -
      </button>
      <input
        className="item-quantity"
        type="number"
        min="0"
        max="100"
        value={item.quantity}
        readOnly
      />
      <button
        className="quantity-count-plus"
        data-action="plus"
        type="button"
        onClick={increaseQuantityHandler}
      >
        +
      </button>
    </div>
  );
}
