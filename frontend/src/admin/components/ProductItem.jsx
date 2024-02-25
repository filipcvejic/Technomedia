import React from "react";
import { Link } from "react-router-dom";
import Card from "../../shared/components/Card";

function ProductItem({ id, name, image }) {
  return (
    <Card>
      <Link to={`/product/${id}`}>
        <div>
          <img src={`http://localhost:5000/images/${image}`} alt={name} />
        </div>
        <div>
          <h2>{name}</h2>
        </div>
      </Link>
    </Card>
  );
}

export default ProductItem;
