import ProductItem from "./ProductItem";
import Loader from "../../shared/components/Loader";
import "./RecommendedProductsList.css";

function RecommendedProductsList({ recommendedProducts }) {
  return (
    <div className="recommended-products-container">
      <h1 className="recommended-products-title">Recommended products</h1>
      {recommendedProducts ? (
        <div className="recommended-products">
          {recommendedProducts?.map((product) => (
            <ProductItem data={product} key={product._id} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default RecommendedProductsList;
