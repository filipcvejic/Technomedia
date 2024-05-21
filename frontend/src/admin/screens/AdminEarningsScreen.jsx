import React, { useEffect, useState } from "react";

import "./AdminEarningsScreen.css";
import SellingPerCategoryContainer from "../components/SellingPerCategoryContainer";
import BestSellingProductsContainer from "../components/BestSellingProductsContainer";
import EarningsChartContainer from "../components/EarningsChartContainer";
import { toast } from "react-toastify";

function AdminEarningsScreen() {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [chartData, setChartData] = useState({
    monthlyEarnings: [],
    categories: { labels: [], data: [] },
    topProducts: [],
  });

  useEffect(() => {
    const getChartInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/chart-info/${year}`
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData);
        }

        setChartData(responseData);
      } catch (err) {
        toast.error(err);
      }
    };

    getChartInfo();
  }, [year]);

  const selectPreviusYearHandler = () => {
    setYear((prevYear) => prevYear - 1);
  };

  const selectNextYearHandler = () => {
    if (year < currentYear) {
      setYear((prevYear) => prevYear + 1);
    }
  };

  return (
    <div className="earnings-page-container">
      <div className="earnings-wrapper">
        <EarningsChartContainer
          chartData={chartData.monthlyEarnings}
          currentYear={currentYear}
          year={year}
          onPreviousYear={selectPreviusYearHandler}
          onNextYear={selectNextYearHandler}
        />
      </div>
      <div className="top-selling-container">
        <SellingPerCategoryContainer chartData={chartData.categories} />
        <BestSellingProductsContainer chartData={chartData.topProducts} />
      </div>
    </div>
  );
}

export default AdminEarningsScreen;
