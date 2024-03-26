import { useDispatch } from "react-redux";
import "./QuantityInput.css";

export default function QuantityInput({ item }) {

  const dispatch = useDispatch()
  
  const onChangeQuantityHandler = (event) => {
    if(event.target.value < item.quantity) {

    }
  };

  return (
    <div class="quantity-input">
      <button class="quantity-count-minus" data-action="minus" type="button">
        -
      </button>
      <input
        class="item-quantity"
        type="number"
        min="0"
        max="100"
        value={item.quantity}
        onChange={onChangeQuantityHandler}
      />
      <button class="quantity-count-plus" data-action="plus" type="button">
        +
      </button>
    </div>
  );
}
