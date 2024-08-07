import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ chartData }) {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "# of Votes",
        data: chartData.data,
        backgroundColor: ["#FFA157", "#FF6B18", "#D14B00", "#983700"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Doughnut
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 3,

        plugins: {
          legend: {
            position: "right",
            labels: {
              usePointStyle: true,
              padding: 18,
              font: {
                size: 16,
              },
            },
            title: {
              font: "Helvetica",
            },
          },
        },
        layout: {
          padding: {
            left: 0,
            right: 25,
            top: 0,
            bottom: 0,
          },
        },
      }}
    />
  );
}

export default DoughnutChart;
