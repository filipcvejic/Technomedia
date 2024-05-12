import React, { useEffect, useState } from "react";
import Slider from "react-slider";
import "./PriceRangeSlider.css";
import { useSearchParams } from "react-router-dom";

function PriceRangeSlider({ minPrice, maxPrice, label }) {
  const [values, setValues] = useState([
    Math.ceil(minPrice),
    Math.ceil(maxPrice),
  ]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentValues = searchParams
      .getAll(label)
      .flatMap((value) => value.split("-"));
    if (currentValues.length > 0) {
      setValues([+currentValues[1], +currentValues[3]]);
    }
  }, [label]);

  const handleChange = (newValues) => {
    setValues(newValues);
    updateSearchParams(newValues);
  };

  const updateSearchParams = (newValues) => {
    const [min, max] = newValues;
    const priceRange = `from-${Math.ceil(min)}-to-${Math.ceil(max)}`;
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set(label, priceRange);
      return newParams;
    });
  };

  return (
    <div className="price-range-slider">
      <div className="price-range-header">
        <h3>Price</h3>
      </div>
      <div className="group-price-range">
        <p>{Math.ceil(minPrice)} EUR</p>
        <p>{Math.ceil(maxPrice)} EUR</p>
      </div>
      <Slider
        className="slider"
        value={values}
        onAfterChange={handleChange}
        min={minPrice}
        max={maxPrice}
        step={1}
      />
      <div className="current-price-range">
        <p>
          {Math.ceil(values[0])} EUR - {Math.ceil(values[1])} EUR
        </p>
      </div>
    </div>
  );
}

export default PriceRangeSlider;
