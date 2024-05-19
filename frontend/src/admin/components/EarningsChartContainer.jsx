import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./EarningsChartContainer.css";
import LeftObtuseArrowIcon from "../svgs/LeftObtuseArrowIcon";
import RightObtuseArrowIcon from "../svgs/RightObtuseArrowIcon";
import Loader from "../../shared/components/Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function EarningsChartContainer({
  chartData,
  currentYear,
  year,
  onPreviousYear,
  onNextYear,
}) {
  const data = {
    labels,
    datasets: [
      {
        data: chartData,
        borderColor: "#FF7C32",
        backgroundColor: "#FF7C32",
      },
    ],
  };

  return (
    <div className="earnings-chart-container">
      {chartData.length > 0 ? (
        <>
          <div className="earnings-chart-navigation">
            <button
              className="previus-year-button"
              onClick={onPreviousYear}
              disabled={year <= 2022}
            >
              <LeftObtuseArrowIcon />
            </button>
            <button
              className="next-year-button"
              onClick={onNextYear}
              disabled={year >= currentYear}
            >
              <RightObtuseArrowIcon />
            </button>
          </div>
          <Line
            options={{
              elements: {
                line: {
                  tension: 0.5,
                },
              },
              responsive: true,
              aspectRatio: 3,
              plugins: {
                legend: false,
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      let label = context.dataset.label || "";
                      if (label) {
                        label += ": ";
                      }
                      if (context.parsed.y !== null) {
                        label += `${context.parsed.y} $`;
                      }
                      return label;
                    },
                  },
                },
              },
              scales: {
                y: {
                  ticks: {
                    callback: function (value, index, values) {
                      return `${value} $`;
                    },
                  },
                },
              },
            }}
            data={data}
          />
          <h1>{year}</h1>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default EarningsChartContainer;
