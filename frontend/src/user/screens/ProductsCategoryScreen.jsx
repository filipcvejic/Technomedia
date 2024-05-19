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
          `http://localhost:3000/api/search?category=${categoryName}${
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
        navigate("/");
      }
    };

    getCategoryData();
  }, [searchParams]);

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
              <SortButton additionalOptions={["Popularity"]} />
            </div>
            <div className="category-products">
              <div className="category-products-filter-container">
                <SubcategoryListContainer
                  subcategories={categoryData?.subcategories}
                />
                <BrandFilterList brands={categoryData?.brands} />
                <PriceRangeSlider
                  minPrice={categoryData?.minPrice}
                  maxPrice={categoryData?.maxPrice}
                  label={"price"}
                />
              </div>
              <FilteredProductsList products={categoryData?.products} />
            </div>
          </div>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
}

export default ProductsCategoryScreen;
