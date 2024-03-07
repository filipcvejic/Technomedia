import React from "react";
import { Link } from "react-router-dom";
import Card from "../../shared/components/Card";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartApi";

function ProductItem({ data }) {
  const dispatch = useDispatch();

  const addToCartHandler = async (e) => {
    e.preventDefault();

    await dispatch(
      addToCart({
        product: data._id,
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        category: data.category._id,
        subcategory: data.subcategory._id,
      })
    );
  };

  return (
    <Card>
      <Link to={`/product/${data._id}`}>
        <div>
          <img
            src={`http://localhost:5000/images/${data.image}`}
            alt={data.name}
          />
        </div>
        <div>
          <h2>{data.name}</h2>
        </div>
        <button onClick={addToCartHandler}>Dodaj u korpu</button>
      </Link>
    </Card>
  );
}

export default ProductItem;
