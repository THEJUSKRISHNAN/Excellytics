import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../services/axios';
import Header from '../components/common/Header';

const UploadHistoryPage = () => {
    const [uploads, setUploads] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axiosInstance.get("/upload/history")
                setUploads(response.data);
            } catch (err) {
                setError('Failed to load upload history');
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, []);

    const handleDownload = async (uploadId, filename) => {
        try {
          const response = await axiosInstance.post('/upload/downloadFile',{uploadId},
            {
              responseType: 'blob',
            });

      
        //   Create a URL from the response and trigger download
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename); // suggested filename
          document.body.appendChild(link);
          link.click();
          link.remove();
        } catch (error) {
          console.error('Download error:', error);
          alert('Failed to download the file.');
        }
      };

    return (
        <div className=' bg-gray-100 h-screen'>
        <Header title="History"/>
            <div className="max-w-xl mx-auto px-4 py-10 font-sansmin-h-screen">
                <h2 className="text-3xl font-bold mb-6">Upload History</h2>
                <div>
                    {isLoading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : uploads.length === 0 ? (
                        <p className="text-gray-500">No uploads found.</p>
                    ) : (
                        uploads.map((item, index) => (
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
                                <button className="btn cursor-pointer bg-green-500 text-white px-4 py-1.5 rounded-md font-medium hover:bg-green-600 transition" onClick={() => handleDownload(item._id, item.filename)}>
                                    View
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadHistoryPage;
