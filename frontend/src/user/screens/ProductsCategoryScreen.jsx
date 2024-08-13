import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import BrandFilterList from "../components/BrandFilterList";
import PriceRangeSlider from "../components/PriceRangeSlider";
import "./ProductsCategoryScreen.css";
import FilteredProductsList from "../components/FilteredProductsList";
import SortButton from "../components/SortButton";
import formatBreadcrumbHandler from "../utils/formatBreadcrumbElementHandler";
import SubcategoryListContainer from "../components/SubcategoryListContainer";
import { toast } from "react-toastify";
import SpecificationsFilterList from "../components/SpecificationsFilterList";
import FilterProductsButton from "../components/FilterProductsButton";
import NoProductsContainer from "../components/NoProductsContainer";

function ProductsCategoryScreen() {
  const [categoryData, setCategoryData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();
  const navigate = useNavigate();

  const { categoryName } = params;

  useEffect(() => {
    const currentParams = searchParams.toString();

    const getCategoryData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/search?category=${categoryName}${
            currentParams ? `&${currentParams}` : ""
          }`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setCategoryData(data);
      } catch (err) {
        toast.error(err?.message);
        navigate("/", { replace: true });
      }
    };

    getCategoryData();
  }, [searchParams, params]);

  const categoryFilters = (
    <>
      <SubcategoryListContainer subcategories={categoryData?.subcategories} />
      <BrandFilterList brands={categoryData?.brands} />
      <PriceRangeSlider
        minPrice={categoryData?.minPrice}
        maxPrice={categoryData?.maxPrice}
        label={"price"}
      />
      <SpecificationsFilterList products={categoryData?.products} />
    </>
  );

  return (
    <>
      {categoryData?.products && categoryData?.products.length > 0 ? (
        <div className="products-category-page">
          <ul className="breadcrumbs">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>{formatBreadcrumbHandler(categoryName)}</li>
          </ul>
          <div className="category-products-container">
            <div className="category-info">
              <h1>{formatBreadcrumbHandler(categoryName)}</h1>
              <div className="desktop-sort-button-wrapper">
                <SortButton additionalOptions={["Popularity"]} />
              </div>
              <div className="mobile-products-actions">
                <div className="mobile-filter-button-wrapper">
                  <FilterProductsButton filters={categoryFilters} />
                </div>
                <div className="mobile-sort-button-wrapper">
                  <SortButton
                    additionalOptions={["Popularity"]}
                    isMobile={true}
                  />
                </div>
              </div>
            </div>
            <div className="category-products">
              <div className="category-products-filter-container">
                {categoryFilters}
              </div>
              <FilteredProductsList products={categoryData?.products} />
            </div>
          </div>
        </div>
      ) : (
        <NoProductsContainer label={"category"} />
      )}
    </>
  );
}

export default ProductsCategoryScreen;
