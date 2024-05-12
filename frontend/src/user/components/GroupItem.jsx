import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function GroupItem({ groupName, label }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedValues, setSelectedValues] = useState(new Set());
  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    const currentValues = searchParams
      .getAll(label)
      .flatMap((value) => value.split(","));
    setSelectedValues(new Set(currentValues));
    setIsFilterActive(new Set(currentValues).has(groupName));
  }, [searchParams, label, groupName]);

  const groupClickHandler = () => {
    const newValues = new Set(selectedValues);

    if (isFilterActive) {
      newValues.delete(groupName);
    } else {
      newValues.add(groupName);
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
      className={`single-product-group ${isFilterActive ? "active" : ""}`}
      onClick={groupClickHandler}
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
        {groupName}
      </label>
    </li>
  );
}

export default GroupItem;
