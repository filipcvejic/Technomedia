import "./QuantityInput.css";

import { useCartActions } from "../hooks/useCartActions";

export default function QuantityInput({ item }) {
  const { decreaseProductQuantity, addToCart } = useCartActions();

  return (
    <div className="quantity-input">
      <button
        className="quantity-count-minus"
        data-action="minus"
        type="button"
        onClick={() => decreaseProductQuantity(item.product?._id)}
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
        onClick={() => addToCart(item.product)}
      >
        +
      </button>
    </div>
  );
}
