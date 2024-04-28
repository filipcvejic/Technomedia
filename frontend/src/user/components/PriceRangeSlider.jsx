import React, { useEffect, useState } from "react";
import Slider from "react-slider";

import "./PriceRangeSlider.css";
import { useParams } from "react-router-dom";

function PriceRangeSlider({ minPrice, maxPrice }) {
  const [values, setValues] = useState([minPrice, maxPrice]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("price", `from-${values[0]}-to-${values[1]}`);
      window.history.replaceState(null, "", newUrl.toString());
    }, 1000);

    return () => clearTimeout(delay);
  }, [values]);

  const handleChange = (newValues) => setValues(newValues);

  return (
    <div className="price-range-slider">
      <h2>Price Range</h2>
      <div className="group-price-range">
        <p>{minPrice}</p>
        <p>{maxPrice}</p>
      </div>
      <Slider
        className="slider"
        value={values}
        onChange={handleChange}
        min={minPrice}
        max={maxPrice}
        step={1}
      />
      <div className="current-price-range">
        <p>
          {values[0]} - {values[1]}
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <label htmlFor="minPrice">Min Price:</label>
          <input
            type="number"
            id="minPrice"
            value={values[0]}
            onChange={(e) => handleChange([+e.target.value, values[1]])}
          />
        </div>
        <div>
          <label htmlFor="maxPrice">Max Price:</label>
          <input
            type="number"
            id="maxPrice"
            value={values[1]}
            onChange={(e) => handleChange([values[0], +e.target.value])}
          />
        </div>
      </div>
    </div>
  );
}

export default PriceRangeSlider;
