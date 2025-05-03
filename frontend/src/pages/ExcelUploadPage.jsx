import React, { useState } from 'react';
import { FileUp } from "lucide-react"
import toast from 'react-hot-toast';
import Header from '../components/common/Header';

export default function ExcelUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith('.xlsx')) {
      setFile(selectedFile);
    } else {
      toast.error("Please upload a valid .xlsx file");
    }
  };

  const handleAnalyze = () => {
    if (!file) return toast.error("Please upload an Excel file first.");
    // Process file here or send to backend
    console.log('Analyzing:', file.name);
  };

  return (
    <div>
      <Header title={"Upload"}/>
      <div className="flex flex-1 flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-6">
        
        <div className="md:w-1/2 text-center  space-y-4">
          <h1 className="text-4xl font-bold">Upload Your Excel File</h1>
          <p className="text-lg text-gray-600">Start analyzing your data by uploading an Excel spreadsheet</p>
          <button
            onClick={handleAnalyze}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg btn"
          >
            Analyze
          </button>
        </div>

        <div className="md:w-1/2 mt-8 md:mt-0 flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-white shadow-lg">
          <label className="flex flex-col items-center cursor-pointer">
            <FileUp className='text-green-500 text-[20rem] h-18 w-18' />
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="text-gray-600">Drag and drop a file here, or click to select a file</p>
          </label>
        </div>
      </div>
    </div>
  );
}
