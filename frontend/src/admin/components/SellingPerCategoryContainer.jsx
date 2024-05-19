import React from "react";
import CategoriesIcon from "../svgs/CategoriesIcon";
import DoughnutChart from "../components/DoughnutChart";
import "./SellingPerCategoryContainer.css";
import Loader from "../../shared/components/Loader";

function SellingPerCategoryContainer({ chartData }) {
  const { labels, data } = chartData;

  const isEmpty = labels.length === 0 && data.length === 0;


  return (
    <div className="selling-per-category-container">
      {!isEmpty ? (
        <>
          <div className="selling-per-category-header">
            <CategoriesIcon />
            <h1>Selling per category</h1>
          </div>
          <div className="doughnut-chart">
            <DoughnutChart chartData={chartData} />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default SellingPerCategoryContainer;
