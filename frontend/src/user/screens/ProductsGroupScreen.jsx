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
          `http://localhost:3000/api/search?category=${categoryName}&subcategory=${subcategoryName}&group=${groupName}${
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
  }, [searchParams]);

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
              <SortButton additionalOptions={["Popularity"]} />
            </div>
            <div className="group-products">
              <div className="group-products-filter-container">
                <BrandFilterList brands={groupData?.brands} />
                <PriceRangeSlider
                  minPrice={groupData?.minPrice}
                  maxPrice={groupData?.maxPrice}
                  label={"price"}
                />
                <SpecificationsFilterList products={groupData?.products} />
              </div>
              <FilteredProductsList products={groupData?.products} />
            </div>
          </div>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
}

export default ProductsGroupScreen;
