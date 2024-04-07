import { useState } from "react";

import "./SpecificationsSelectInput.css";

function ProductSpecContainer({ onSpecSelect, initialSpecifications }) {
  const [invalidIndex, setInvalidIndex] = useState(-1);

  const handleChange = (index, key, value) => {
    const updatedSpecs = [...initialSpecifications];
    updatedSpecs[index][key] = value;
    onSpecSelect(updatedSpecs);
  };

  const addSpecification = () => {
    const lastSpec = initialSpecifications[initialSpecifications.length - 1];
    if (
      lastSpec &&
      (lastSpec.type.trim() === "" || lastSpec.value.trim() === "")
    ) {
      setInvalidIndex(initialSpecifications.length - 1);
      return;
    }

    onSpecSelect([...initialSpecifications, { type: "", quantity: "" }]);
    setInvalidIndex(-1);
  };

  const removeSpec = (index) => {
    const updatedSpecs = [...initialSpecifications];
    updatedSpecs.splice(index, 1);
    onSpecSelect(updatedSpecs);
  };

  return (
    <div className="specifications-form">
      <div className="specifications-form-details">
        <label htmlFor="specifications">Add specifications</label>
        <button
          className="add-specification-button"
          onClick={addSpecification}
          type="button"
        >
          +
        </button>
      </div>
      <div className="specifications-container">
        <div className="specification-type-container">
          {initialSpecifications?.map((spec, index) => (
            <div className="specification-type-details" key={index}>
              <input
                type="text"
                className="spec-input"
                placeholder="Tip specifikacije"
                value={spec.type}
                onChange={(e) => handleChange(index, "type", e.target.value)}
                style={{
                  border:
                    index === invalidIndex && spec.type?.trim() === ""
                      ? "1px solid #ff7c32"
                      : "",
                }}
              />
            </div>
          ))}
        </div>
        <div className="specification-value-container">
          {initialSpecifications?.map((spec, index) => (
            <div className="specification-value-details" key={index}>
              <input
                type="text"
                className="spec-input"
                placeholder="Količina"
                value={spec.value}
                onChange={(e) => handleChange(index, "value", e.target.value)}
                style={{
                  borderColor:
                    index === invalidIndex && spec.value?.trim() === ""
                      ? "1px solid #ff7c32"
                      : "",
                }}
              />
            </div>
          ))}
        </div>
        <div className="remove-specification-container">
          {initialSpecifications?.map((spec, index) => (
            <button
              className="remove-specification-button"
              key={index}
              onClick={() => removeSpec(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.0"
                width="19"
                height="18"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path d="M1905 5036 c-64 -30 -90 -60 -154 -185 l-52 -101 -597 0 -598 0 -44 -22 c-33 -17 -51 -35 -67 -68 -21 -41 -23 -57 -23 -225 0 -168 2 -184 23 -225 16 -33 34 -51 67 -67 l44 -23 2056 0 2056 0 44 23 c33 16 51 34 68 67 20 41 22 57 22 225 0 168 -2 184 -22 225 -17 33 -35 51 -68 68 l-44 22 -598 0 -597 0 -52 101 c-61 119 -87 152 -143 182 -41 22 -43 22 -656 25 l-615 2 -50 -24z" />
                  <path d="M690 3769 c0 -93 200 -3250 209 -3314 30 -189 185 -350 370 -385 73 -14 2509 -14 2582 0 185 35 340 196 370 385 9 64 209 3221 209 3314 l0 41 -1870 0 -1870 0 0 -41z" />
                </g>
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductSpecContainer;
