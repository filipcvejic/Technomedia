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
import FilterProductsButton from "../components/FilterProductsButton";
import NoProductsContainer from "../components/NoProductsContainer";

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
          `${
            import.meta.env.VITE_API_URL
          }/api/search?category=${categoryName}&subcategory=${subcategoryName}${
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
  }, [searchParams, params]);

  const subcategoryFilters = (
    <>
      <GroupFilterList groups={subcategoryData?.groups} />
      <BrandFilterList brands={subcategoryData?.brands} />
      <PriceRangeSlider
        minPrice={subcategoryData?.minPrice}
        maxPrice={subcategoryData?.maxPrice}
        label={"price"}
      />
      <SpecificationsFilterList products={subcategoryData?.products} />
    </>
  );

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
              <div className="desktop-sort-button-wrapper">
                <SortButton additionalOptions={["Popularity"]} />
              </div>
              <div className="mobile-products-actions">
                <div className="mobile-filter-button-wrapper">
                  <FilterProductsButton filters={subcategoryFilters} />
                </div>
                <div className="mobile-sort-button-wrapper">
                  <SortButton
                    additionalOptions={["Popularity"]}
                    isMobile={true}
                  />
                </div>
              </div>
            </div>
            <div className="subcategory-products">
              <div className="subcategory-products-filter-container">
                {subcategoryFilters}
              </div>
              <FilteredProductsList products={subcategoryData?.products} />
            </div>
          </div>
        </div>
      ) : (
        <NoProductsContainer label={"subcategory"} />
      )}
    </>
  );
}

export default ProductsSubcategoryScreen;
