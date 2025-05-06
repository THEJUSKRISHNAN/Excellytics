import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/common/Header';
import { downloadFile } from '../store/dashboard-slice/dashboardSlice';

const HistoryPage = () => {
  const dispatch = useDispatch();

  const { uploadHistory, historyLoading, historyError, downloadLoading, downloadError } = useSelector((state) => state.dashboard);

  const handleDownload = (e,uploadId, filename) => {
    e.preventDefault();
    dispatch(downloadFile({ uploadId, filename }));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header title="History" />
      <div className="max-w-xl mx-auto px-4 py-10 font-sans">
        <h2 className="text-3xl font-bold mb-6">Upload History</h2>

        {historyLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : historyError ? (
          <p className="text-red-500">{historyError}</p>
        ) : uploadHistory.length === 0 ? (
          <p className="text-gray-500">No uploads found.</p>
        ) : (
          uploadHistory.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white shadow rounded-xl p-4 mb-4"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-semibold text-lg">{item.filename}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(item.uploadedAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              <button
                className="btn cursor-pointer bg-green-500 text-white px-4 py-1.5 rounded-md font-medium hover:bg-green-600 transition disabled:opacity-50"
                onClick={(e) => handleDownload(e,item._id, item.filename)}
              >
                View
              </button>
            </div>
          ))
        )}

        {downloadError && <p className="text-red-500 mt-4">{downloadError}</p>}
      </div>
    </div>
  );
};

export default HistoryPage;

