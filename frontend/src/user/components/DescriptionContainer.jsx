import SingleProductOverviewContainer from "./SingleProductOverviewContainer";

import "./DescriptionContainer.css";

function DescriptionContainer({ description }) {
  return (
    <SingleProductOverviewContainer
      title="Description"
      content={
        <div className="product-description-details">
          <div className="single-description-field">
            <span className="single-description-field-type">Description:</span>
            <span className="single-description-field-value">
              {description}
            </span>
          </div>
        </div>
      }
    />
  );
}

export default DescriptionContainer;
