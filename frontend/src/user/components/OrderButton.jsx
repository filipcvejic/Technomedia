import "./OrderButton.css";
import { useState } from "react";
import OrderModalTemplate from "./OrderModalTemplate";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCart } from "../features/cart/cartSlice";

function OrderButton({ data, label }) {
  const [orderStatus, setOrderStatus] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userAuth);

  const orderItemsHandler = async (event) => {
    event.preventDefault();

    if (userInfo) {
      let requestData;

      if (Array.isArray(data)) {
        requestData = data.map((item) => ({
          _id: item.product._id,
          quantity: item.quantity,
        }));
      } else {
        requestData = [{ _id: data._id, quantity: 1 }];
      }

      if (requestData.length > 0) {
        const response = await fetch("http://localhost:3000/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ products: requestData }),
        });

        const responseData = await response.json();

        dispatch(setCart(responseData.updatedCart));

        setOrderStatus(response.ok ? "success" : "failed");
        setTimeout(() => {
          setOrderStatus("");
        }, 1000);

        navigate("/");
      }
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  return (
    <>
      {orderStatus !== "" && <OrderModalTemplate status={orderStatus} />}
      <button className="order-button" onClick={orderItemsHandler}>
        {label}
      </button>
    </>
  );
}

export default OrderButton;
