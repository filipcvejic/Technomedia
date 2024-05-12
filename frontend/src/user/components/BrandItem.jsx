import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function BrandItem({ brandName, label }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedValues, setSelectedValues] = useState(new Set());
  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    const currentValues = searchParams
      .getAll(label)
      .flatMap((value) => value.split(","));
    setSelectedValues(new Set(currentValues));
    setIsFilterActive(new Set(currentValues).has(brandName));
  }, [searchParams, label, brandName]);

  const brandClickHandler = () => {
    const newValues = new Set(selectedValues);

    if (isFilterActive) {
      newValues.delete(brandName);
    } else {
      newValues.add(brandName);
    }

    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);

      newParams.delete(label);

      newParams.append(label, Array.from(new Set(newValues)));

      if (newValues.size === 0) newParams.delete(label);

      return newParams;
    });

    setSelectedValues(newValues);
  };

  return (
    <li
      className={`single-product-brand ${isFilterActive ? "active" : ""}`}
      onClick={brandClickHandler}
    >
      <label>
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isFilterActive}
          onChange={() => {}}
          readOnly
        />
        <span className="checkbox-custom"></span>
        {brandName}
      </label>
    </li>
  );
}

export default BrandItem;
