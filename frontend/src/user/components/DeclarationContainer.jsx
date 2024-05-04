import SingleProductOverviewContainer from "./SingleProductOverviewContainer";

import "./DeclarationContainer.css";

function DeclarationContainer({ product }) {
  return (
    <SingleProductOverviewContainer
      title="Declaration"
      content={
        <div className="product-declaration-details">
          <div className="single-declaration-field">
            <span className="single-declaration-field-type">Model:</span>
            <span className="single-declaration-field-value">
              {product.name}
            </span>
          </div>
          <div className="single-declaration-field">
            <span className="single-declaration-field-type">
              Name and type of goods:
            </span>
            <span className="single-declaration-field-value">
              {product.subcategory.name}
            </span>
          </div>
          <div className="single-declaration-field">
            <span className="single-declaration-field-type">Importer:</span>
            <span className="single-declaration-field-value">
              {product.brand.name} D.O.O
            </span>
          </div>
          <div className="single-declaration-field">
            <span className="single-declaration-field-type">
              Country of origin:
            </span>
            <span className="single-declaration-field-value">China</span>
          </div>
          <div className="single-declaration-field">
            <span className="single-declaration-field-type">
              Consumer rights:
            </span>
            <span className="single-declaration-field-value">
              All customer rights are guaranteed based on the law on consumer
              protection
            </span>
          </div>
        </div>
      }
    />
  );
}

export default DeclarationContainer;
