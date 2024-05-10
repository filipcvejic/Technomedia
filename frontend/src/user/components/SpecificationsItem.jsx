import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function SpecificationsItem({ specValue, specType }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedValues, setSelectedValues] = useState(new Set());
  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    const currentValues = searchParams
      .getAll(specType)
      .flatMap((value) => value.split(","));
    setSelectedValues(new Set(currentValues));
    setIsFilterActive(selectedValues.has(specValue));
  }, [searchParams, specType, specValue, selectedValues]);

  const specificationClickHandler = () => {
    const newValues = new Set(selectedValues);

    if (isFilterActive) {
      newValues.delete(specValue);
    } else {
      newValues.add(specValue);
    }

    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);

      newParams.delete(specType);

      newParams.append(specType, Array.from(new Set(newValues)));

      if (newValues.size === 0) newParams.delete(specType);

      return newParams;
    });

    setSelectedValues(newValues);
  };

  return (
    <li
      className={`single-product-specification ${
        isFilterActive ? "active" : ""
      }`}
      onClick={specificationClickHandler}
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
        {specValue}
      </label>
    </li>
  );
}

export default SpecificationsItem;
