import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductItem from "../components/ProductItem";

import "./AdminHomeScreen.css";

function AdminHomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const getProducts = async () => {
        const response = await fetch(
          "http://localhost:3000/api/admin/products"
        );

        const data = await response.json();

        console.log(data);

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

  return (
    <div className="products">
      {products.map((product) => (
        <ProductItem
          key={product._id}
          id={product._id}
          name={product.name}
          image={product.image}
        />
      ))}
    </div>
  );
}

export default AdminHomeScreen;
