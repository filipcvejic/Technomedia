import React, { useEffect, useState } from "react";
import Slider from "react-slider";
import "./PriceRangeSlider.css";
import { useLocation, useNavigate } from "react-router-dom";

function PriceRangeSlider({ products }) {
  const [values, setValues] = useState([0, 0]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((product) => product.price);
      const newMinPrice = Math.ceil(Math.min(...prices));
      const newMaxPrice = Math.ceil(Math.max(...prices));
      setMinPrice(newMinPrice);
      setMaxPrice(newMaxPrice);
    }
  }, [products]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const priceParam = urlParams.get("price");
    if (priceParam) {
      const [min, max] = priceParam.match(/\d+/g);
      setValues([parseInt(min), parseInt(max)]);
    }
  }, [location.search]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const currentUrlParams = new URLSearchParams(window.location.search);
      currentUrlParams.set("price", `from-${values[0]}-to-${values[1]}`);
      const newUrl = `${
        window.location.pathname
      }?${currentUrlParams.toString()}`;
      navigate(newUrl);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [values]);

  const handleChange = (newValues) => {
    setValues(newValues);
  };

  return (
    <div className="price-range-slider">
      <div className="price-range-header">
        <h3>Price</h3>
      </div>
      <div className="group-price-range">
        <p>{minPrice} EUR</p>
        <p>{maxPrice} EUR</p>
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
          {values[0]} EUR - {values[1]} EUR
        </p>
      </div>
    </div>
  );
}

export default PriceRangeSlider;
