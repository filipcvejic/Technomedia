import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import GroupFilterList from "../components/GroupFilterList";
import BrandFilterList from "../components/BrandFilterList";
import PriceRangeSlider from "../components/PriceRangeSlider";
import SpecificationsFilterList from "../components/SpecificationsFilterList";
import "./ProductsSubcategoryScreen.css";
import FilteredProductsList from "../components/FilteredProductsList";
import SortButton from "../components/SortButton";
import formatBreadcrumbHandler from "../utils/formatBreadcrumbElementHandler";
import { toast } from "react-toastify";

function ProductsSubcategoryScreen() {
  const [subcategoryData, setSubcategoryData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();
  const navigate = useNavigate();

  const { categoryName, subcategoryName } = params;

  useEffect(() => {
    const currentParams = searchParams.toString();

    const getSubcategoryData = async () => {
      try {
        const response = await fetch(
          `https://technomedia-5gpn.onrender.com/api/search?category=${categoryName}&subcategory=${subcategoryName}${
            currentParams ? `&${currentParams}` : ""
          }`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setSubcategoryData(data);
      } catch (err) {
        toast.error(err?.message);
        navigate("/");
      }
    };

    getSubcategoryData();
  }, [searchParams]);

  return (
    <>
      {subcategoryData?.products && subcategoryData?.products.length > 0 ? (
        <div className="products-subcategory-page">
          <ul className="breadcrumbs">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={`/${categoryName}`}>
                {formatBreadcrumbHandler(categoryName)}
              </Link>
            </li>
            <li>{formatBreadcrumbHandler(subcategoryName)}</li>
          </ul>
          <div className="subcategory-products-container">
            <div className="subcategory-info">
              <h1>{formatBreadcrumbHandler(subcategoryName)}</h1>
              <SortButton additionalOptions={["Popularity"]} />
            </div>
            <div className="subcategory-products">
              <div className="subcategory-products-filter-container">
                <GroupFilterList groups={subcategoryData?.groups} />
                <BrandFilterList brands={subcategoryData?.brands} />
                <PriceRangeSlider
                  minPrice={subcategoryData?.minPrice}
                  maxPrice={subcategoryData?.maxPrice}
                  label={"price"}
                />
                <SpecificationsFilterList
                  products={subcategoryData?.products}
                />
              </div>
              <FilteredProductsList products={subcategoryData?.products} />
            </div>
          </div>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
}

export default ProductsSubcategoryScreen;
