import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import "./HomeScreen.css";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const getProducts = async () => {
        const response = await fetch("http://localhost:3000/api/products");

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

  return (
    <div className="homepage">
      <div className="products">
        {products.map((product) => (
          <ProductItem key={product._id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
