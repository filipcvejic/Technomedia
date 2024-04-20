import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import "./ProductsGroupScreen.css";

function ProductsGroupScreen() {
  const [groupData, setGroupData] = useState(null);

  const params = useParams();

  useEffect(() => {
    const getGroupData = async () => {
      const { categoryName, subcategoryName, groupName } = params;

      try {
        const response = await fetch(
          `/api/products/${categoryName}/${subcategoryName}/${groupName}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setGroupData(data);
      } catch (err) {
        toast.error(err?.message);
      }
    };

    getGroupData();
  }, []);
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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsGroupScreen;
