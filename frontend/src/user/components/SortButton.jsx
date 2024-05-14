import { useSearchParams } from "react-router-dom";
import "./SortButton.css";
import { useEffect, useState } from "react";

function SortButton({ additionalOptions }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(additionalOptions[0]);

  useEffect(() => {
    const currentFilter = searchParams.get("sort");
    if (currentFilter) {
      setActiveFilter(currentFilter);
    }
  }, [searchParams]);

  const selectOptionHandler = (event) => {
    const selectedFilter = event.target.value;
    setActiveFilter(selectedFilter);
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);

      selectedFilter === additionalOptions[0]
        ? newParams.delete("sort")
        : newParams.set("sort", selectedFilter);

      return newParams;
    });
  };

  const defaultOptions = ["Price low to high", "Price high to low"];

  return (
    <div className="sort-container">
      <span>Sort by:</span>
      <select
        className="sort-button"
        value={activeFilter}
        onChange={selectOptionHandler}
      >
        {additionalOptions?.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
        {defaultOptions?.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortButton;
