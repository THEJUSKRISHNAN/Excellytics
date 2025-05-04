import React, { useEffect, useState } from "react";
import { axiosInstance } from '../services/axios';
import { useSelector } from "react-redux";
import Header from "../components/common/Header";
import DateChart from "../components/charts/DateChart"

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalUploads: 0,
    recentUpload: "N/A",
    storageUsed: "0 MB",
  });
  const [chartData, setChartData] = useState(null);


  const authUser = useSelector((state) => state.auth.authUser);

  const [Insight, setInsight] = useState("Analyzing trends...");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axiosInstance.get("/upload/dashboard", {
          withCredentials: true,
        });
        setStats(res.data.stats);
        setInsight(res.data.Insight || "No smart insights available.");
        setChartData(res.data.dataByDate)
      } catch (err) {
        console.error("Error fetching dashboard stats:", err.message);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <Header title="Dashboard" />
      <div className="p-8 min-h-screen bg-gray-100">
        {/* Welcome */}
        <h1 className="text-3xl font-bold mb-4">Welcome back, {authUser?.fullName} 👋</h1>
        <p className="text-gray-600 mb-8">Here's a quick overview of your Excelytics activity.</p>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-sm text-gray-500">📁 Total Uploads</p>
            <h2 className="text-2xl font-bold">{stats.totalUploads}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-sm text-gray-500">📊 Recent Upload File</p>
            <h2 className="text-lg font-semibold">{stats.recentUpload}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-sm text-gray-500">💾 Storage Used</p>
            <h2 className="text-lg font-semibold">{stats.storageUsed}</h2>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-bold mb-2">🧠 Insight</h3>
          <p className="text-gray-700">{Insight}</p>
        </div>

        {chartData && <div className=" mt-10">
          <DateChart chartData={chartData} />
        </div>}

      </div>


    </>
  );
};

export default DashboardPage;
