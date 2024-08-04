import { useEffect, useState } from "react";
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
        const earningsRequest = fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/earnings/${year}`,
          {
            credentials: "include",
          }
        );
        const categoriesRequest = fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/top-categories/${year}`,
          {
            credentials: "include",
          }
        );
        const productsRequest = fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/top-products/${year}`,
          {
            credentials: "include",
          }
        );

        const [earningsResponse, categoriesResponse, productsResponse] =
          await Promise.all([
            earningsRequest,
            categoriesRequest,
            productsRequest,
          ]);

        if (
          !earningsResponse.ok ||
          !categoriesResponse.ok ||
          !productsResponse.ok
        ) {
          throw new Error("One or more requests failed");
        }

        const [monthlyEarnings, categories, topProducts] = await Promise.all([
          earningsResponse.json(),
          categoriesResponse.json(),
          productsResponse.json(),
        ]);

        setChartData({
          monthlyEarnings,
          categories,
          topProducts,
        });
      } catch (err) {
        toast.error(err.message || "An error occurred while fetching data");
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
