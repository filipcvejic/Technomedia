import SingleProductOverviewContainer from "./SingleProductOverviewContainer";

import "./SpecificationsContainer.css";

function SpecificationsContainer({ product }) {
  return (
    <SingleProductOverviewContainer
      title="Specifications"
      content={
        <div className="product-specifications-details">
          {product?.specifications?.map((specification) => (
            <div className="single-specification-field" key={specification._id}>
              <span className="single-specification-field-type">
                {specification.type}:
              </span>
              <span className="single-specification-field-value">
                {specification.value}
              </span>
            </div>
          ))}
        </div>
      }
    />
  );
}

export default SpecificationsContainer;
