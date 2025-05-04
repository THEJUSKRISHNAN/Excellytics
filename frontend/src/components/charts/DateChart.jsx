import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const DateChart = ({ chartData }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (chartData && typeof chartData === "object" && Object.keys(chartData).length > 0) {
      const sortedDates = Object.keys(chartData).sort();
      const values = sortedDates.map((date) => chartData[date]);

      setData({
        labels: sortedDates,
        datasets: [
          {
            label: "Uploads per Day",
            data: values,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.3,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      });
    }
  }, [chartData]);

  return (
    <div className="p-12 bg-white shadow rounded-xl w-full mx-auto" style={{ height: "40rem" }}>
      <h2 className="text-lg lg:text-2xl font-semibold mb-4 text-center">📈 Uploads Over Time</h2>
      {data ? (
        <div className="w-full h-full">
          <Line data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              layout: {
                padding: 20,
              },
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  mode: "index",
                  intersect: false,
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Date",
                  },
                  ticks: {
                    maxRotation: 45,
                    minRotation: 30,
                    autoSkip: true,
                    maxTicksLimit: 10,
                  },
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Uploads",
                  },
                  ticks: {
                    stepSize: 1,
                    precision: 0,
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <p className="text-center text-gray-500">No chart data available.</p>
      )}
    </div>
  );
};

export default DateChart;
