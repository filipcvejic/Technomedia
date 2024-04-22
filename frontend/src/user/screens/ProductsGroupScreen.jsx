import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import "./ProductsGroupScreen.css";
import PriceRangeSlider from "../components/PriceRangeSlider";

function ProductsGroupScreen() {
  const [groupData, setGroupData] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const params = useParams();

  useEffect(() => {
    const getGroupData = async () => {
      const { categoryName, subcategoryName, groupName } = params;

      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${categoryName}/${subcategoryName}/${groupName}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        const prices = data.map((product) => product.price);
        const minPrice = Math.ceil(Math.min(...prices));
        const maxPrice = Math.ceil(Math.max(...prices));

        console.log(minPrice, maxPrice);

        setMinPrice(minPrice);
        setMaxPrice(maxPrice);

        setGroupData(data);
      } catch (err) {
        toast.error(err?.message);
      }
    };

    getGroupData();
  }, [params]);
  return (
    <>
      {groupData && (
        <div className="products-group-page">
          <ul className="breadcrumbs">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          <div className="group-products-container">
            <div className="group-info">
              <h2>Laptopovi</h2>
              <div className="sort-container">
                <span>Sort by:</span>
                <select className="sort-button">
                  <option value="">Popularnosti</option>
                  <option value="">Ceni nanize</option>
                  <option value="">Ceni navise</option>
                </select>
              </div>
            </div>
            <div className="group-products">
              <div className="group-products-filter-container">
                <div className="brand-filter-container">
                  <span>Brand</span>
                  <ul className="brands-filter-list">
                    {Array.from(
                      new Set(groupData.map((product) => product.brand.name))
                    ).map((brandName, index) => (
                      <li className="single-product-brand" key={index}>
                        <label>
                          <input type="checkbox" className="custom-checkbox" />
                          <span className="checkbox-custom"></span>
                          {brandName}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="price-filter-container">
                  <span>Price</span>
                  <PriceRangeSlider minPrice={minPrice} maxPrice={maxPrice} />
                </div>
                <div className="specifications-filter-container">
                  {/* {groupData.} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsGroupScreen;
