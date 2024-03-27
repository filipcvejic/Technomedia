import { useDispatch } from "react-redux";
import "./QuantityInput.css";
import { addToCart, decreaseProductQuantity } from "../features/cart/cartApi";

export default function QuantityInput({ item }) {
  const dispatch = useDispatch();

  const increaseQuantityHandler = (event) => {
    event.preventDefault();

    dispatch(
      addToCart({
        product: item.product?._id,
        name: item.product.name,
        description: item.product.description,
        price: item.product.price,
        image: item.product.image,
        category: item.product.category?._id,
        subcategory: item.product.subcategory?._id,
      })
    );
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
