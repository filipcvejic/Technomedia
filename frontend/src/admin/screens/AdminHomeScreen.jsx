import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductItem from "../components/ProductItem";

import "./AdminHomeScreen.css";
import { addToCart } from "../features/cart/cartApi";
import { useDispatch, useSelector } from "react-redux";

function AdminHomeScreen() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  console.log(cart);

  useEffect(() => {
    try {
      const getProducts = async () => {
        const response = await fetch(
          "http://localhost:3000/api/admin/products"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setProducts(data.products);
      };

      getProducts();
    } catch (err) {
      toast.error(err?.message);
    }
  }, []);

  const deleteHandler = async (e) => {
    e.preventDefault();

    await fetch(
      "http://localhost:3000/api/admin/cart/remove-product/65db371e8a0bc30bf331f9a1",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
  };

  return (
    <>
      <button onClick={deleteHandler}>Klik</button>
      <div className="products">
        {products.map((product) => (
          <ProductItem key={product._id} data={product} />
        ))}
      </div>
    </>
  );
}

export default AdminHomeScreen;
