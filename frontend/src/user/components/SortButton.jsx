import { useSearchParams } from "react-router-dom";
import "./SortButton.css";
import { useEffect, useState } from "react";
import ArrowIcon from "../svgs/ArrowIcon";
import MobileSortListContent from "./MobileSortListContent";

function SortButton({ additionalOptions, isMobile }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(additionalOptions[0]);
  const [isMobileSortListExpanded, setIsMobileSortListExpanded] =
    useState(false);

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

  const closeMobileSortListHandler = () => {
    setIsMobileSortListExpanded(false);
  };

  const defaultOptions = ["Price low to high", "Price high to low"];

  const desktopHTML = (
    <>
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
    </>
  );

  const mobileHTML = (
    <>
      <button
        className="mobile-sort-button"
        onClick={() => setIsMobileSortListExpanded(true)}
      >
        <span>Sorting</span> <ArrowIcon />
      </button>
      {isMobileSortListExpanded && (
        <MobileSortListContent
          options={defaultOptions}
          additionalOptions={additionalOptions}
          onClose={closeMobileSortListHandler}
          activeFilter={activeFilter}
          onSelectOption={selectOptionHandler}
        />
      )}
    </>
  );

  return (
    <div className="sort-container">{isMobile ? mobileHTML : desktopHTML}</div>
  );
}

export default SortButton;
