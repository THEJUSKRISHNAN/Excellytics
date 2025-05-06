import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../services/axios';
import toast from 'react-hot-toast';

// 1. Fetch dashboard stats
export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/upload/dashboard', { withCredentials: true });
      console.log("hi")
      return res.data;
    } catch (err) {
      toast.error("Failed to fetch data")
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 2. Fetch upload history
export const fetchUploadHistory = createAsyncThunk(
  'dashboard/fetchUploadHistory',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/upload/history');
      console.log("history")
      return res.data;
    } catch (err) {
      toast.error("Failed to fetch history")
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 3. Download a file
export const downloadFile = createAsyncThunk(
  'dashboard/downloadFile',
  async ({ uploadId, filename }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        '/upload/downloadFile',
        { uploadId },
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Download successfull")

      return { success: true };
    } catch (err) {
      toast.error('Failed to download the file.');
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 4. Upload a file

export const uploadFile = createAsyncThunk(
  'dashboard/uploadFile',
  async (file, { rejectWithValue, dispatch }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await axiosInstance.post('/upload/uploadFile', formData);
      toast.success('File uploaded to database');

      // Trigger dashboard and history refresh
      dispatch(fetchDashboardData());
      dispatch(fetchUploadHistory());

      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload file failed');
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    loading: false,
    error: null,
    stats: {
        totalUploads: 0,
        recentUpload: "N/A",
        storageUsed: "0 MB",
      },
    insight: '',
    chartData: [],
    uploadHistory: [],
    historyLoading: false,
    historyError: null,
    downloadLoading: false,
    downloadError: null,
    uploadLoading: false,
    uploadError: null,
    uploadResponse: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Dashboard
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.insight = action.payload.Insight || 'No smart insights available.';
        state.chartData = action.payload.dataByDate;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch History
      .addCase(fetchUploadHistory.pending, (state) => {
        state.historyLoading = true;
        state.historyError = null;
      })
      .addCase(fetchUploadHistory.fulfilled, (state, action) => {
        state.historyLoading = false;
        state.uploadHistory = action.payload;
      })
      .addCase(fetchUploadHistory.rejected, (state, action) => {
        state.historyLoading = false;
        state.historyError = action.payload;
      })

      // Download File
      .addCase(downloadFile.pending, (state) => {
        state.downloadLoading = true;
        state.downloadError = null;
      })
      .addCase(downloadFile.fulfilled, (state) => {
        state.downloadLoading = false;
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.downloadLoading = false;
        state.downloadError = action.payload;
      })

      // Upload File
      .addCase(uploadFile.pending, (state) => {
        state.uploadLoading = true;
        state.uploadError = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.uploadLoading = false;
        state.uploadResponse = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.uploadLoading = false;
        state.uploadError = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
