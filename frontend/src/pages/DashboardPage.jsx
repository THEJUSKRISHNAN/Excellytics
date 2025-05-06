import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/common/Header";
import DateChart from "../components/charts/DateChart";

const DashboardPage = () => {

  const { stats, insight, chartData, loading, error } = useSelector((state) => state.dashboard);
  const authUser = useSelector((state) => state.auth.authUser);

  return (
    <>
      <Header title="Dashboard" />
      <div className="p-8 min-h-screen bg-gray-100">
        {/* Welcome */}
        <h1 className="text-3xl font-bold mb-4">Welcome back, {authUser?.fullName} 👋</h1>
        <p className="text-gray-600 mb-8">Here's a quick overview of your Excelytics activity.</p>

        {/* Error or Loader */}
        {loading && <p className="text-gray-500">Loading dashboard data...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-sm text-gray-500">📁 Total Uploads</p>
            <h2 className="text-2xl font-bold">{stats?.totalUploads || 0}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-sm text-gray-500">📊 Recent Upload File</p>
            <h2 className="text-lg font-semibold">{stats?.recentUpload || 'N/A'}</h2>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <p className="text-sm text-gray-500">💾 Storage Used</p>
            <h2 className="text-lg font-semibold">{stats?.storageUsed || '0 MB'}</h2>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-bold mb-2">🧠 Insight</h3>
          <p className="text-gray-700">{insight || 'Analyzing trends...'}</p>
        </div>

        {/* Date Chart */}
        {chartData && (
          <div className="mt-10">
            <DateChart chartData={chartData} />
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;

