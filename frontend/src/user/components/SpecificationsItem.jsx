import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SpecificationsItem({ specValue, specType }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Ova funkcija će se pozvati svaki put kada se promeni lokacija
    // Ovde možemo obraditi promene lokacije
    console.log("Location Changed:", location.pathname, location.search);
  }, [location.pathname, location.search]); // Ova kuka će pratiti promene lokacije samo ako se promeni 'pathname' ili 'search' u URL-u

  const specificationClickHandler = () => {
    const searchParams = new URLSearchParams(location.search);

    if (
      searchParams.has(specType) &&
      searchParams.get(specType) === specValue
    ) {
      searchParams.delete(specType);
    } else {
      searchParams.set(specType, specValue);
    }

    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <li
      className="single-product-specification"
      onClick={specificationClickHandler}
    >
      <label>
        <input type="checkbox" className="custom-checkbox" />
        <span className="checkbox-custom"></span>
        {specValue}
      </label>
    </li>
  );
}

export default SpecificationsItem;
