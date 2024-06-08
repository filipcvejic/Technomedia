import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import "./ProductsGroupScreen.css";
import PriceRangeSlider from "../components/PriceRangeSlider";
import formatBreadcrumbHandler from "../utils/formatBreadcrumbElementHandler";
import BrandFilterList from "../components/BrandFilterList";
import SpecificationsFilterList from "../components/SpecificationsFilterList";
import FilteredProductsList from "../components/FilteredProductsList";
import SortButton from "../components/SortButton";
import { toast } from "react-toastify";
import FilterProductsButton from "../components/FilterProductsButton";
import NoProductsContainer from "../components/NoProductsContainer";

function ProductsGroupScreen() {
  const [groupData, setGroupData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();
  const navigate = useNavigate();

  const { categoryName, subcategoryName, groupName } = params;

  useEffect(() => {
    const currentParams = searchParams.toString();

    const getGroupData = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/api/search?category=${categoryName}&subcategory=${subcategoryName}&group=${groupName}${
            currentParams ? `&${currentParams}` : ""
          }`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setGroupData(data);
      } catch (err) {
        toast.error(err?.message);
        navigate("/");
      }
    };

    getGroupData();
  }, [searchParams, params]);

  const groupFilters = (
    <>
      <BrandFilterList brands={groupData?.brands} />
      <PriceRangeSlider
        minPrice={groupData?.minPrice}
        maxPrice={groupData?.maxPrice}
        label={"price"}
      />
      <SpecificationsFilterList products={groupData?.products} />
    </>
  );

  return (
    <>
      {groupData?.products && groupData?.products.length > 0 ? (
        <div className="products-group-page">
          <ul className="breadcrumbs">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={`/${categoryName}`}>
                {formatBreadcrumbHandler(categoryName)}
              </Link>
            </li>
            <li>
              <Link to={`/${subcategoryName}`}>
                {formatBreadcrumbHandler(subcategoryName)}
              </Link>
            </li>
            <li>{formatBreadcrumbHandler(groupName)}</li>
          </ul>
          <div className="group-products-container">
            <div className="group-info">
              <h1>{formatBreadcrumbHandler(groupName)}</h1>
              <div className="desktop-sort-button-wrapper">
                <SortButton additionalOptions={["Popularity"]} />
              </div>
              <div className="mobile-products-actions">
                <div className="mobile-filter-button-wrapper">
                  <FilterProductsButton
                    data={groupData}
                    filters={groupFilters}
                  />
                </div>
                <div className="mobile-sort-button-wrapper">
                  <SortButton
                    additionalOptions={["Popularity"]}
                    isMobile={true}
                  />
                </div>
              </div>
            </div>
            <div className="group-products">
              <div className="group-products-filter-container">
                {groupFilters}
              </div>
              <FilteredProductsList products={groupData?.products} />
            </div>
          </div>
        </div>
      ) : (
        <NoProductsContainer label={"group"} />
      )}
    </>
  );
}

export default ProductsGroupScreen;
