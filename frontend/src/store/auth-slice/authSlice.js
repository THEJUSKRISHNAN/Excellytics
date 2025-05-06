import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../services/axios';
import toast from 'react-hot-toast';
import { fetchDashboardData, fetchUploadHistory } from '../dashboard-slice/dashboardSlice';
// BASE URL
const BASE_URL = "http://localhost:5001";

// Async Thunks

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue, dispatch }) => {
  try {
    const res = await axiosInstance.get("/auth/check");
    dispatch(fetchDashboardData());
    dispatch(fetchUploadHistory());
    return res.data;
  } catch (error) {
    console.error("Error in checkAuth: ", error);
    return rejectWithValue(null);
  }
});

export const signup = createAsyncThunk('auth/signup', async (data, { rejectWithValue, dispatch }) => {
  try {
    const res = await axiosInstance.post("/auth/signup", data);
    toast.success("Account created successfully");
    dispatch(fetchDashboardData());
    dispatch(fetchUploadHistory());
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Signup failed");
    return rejectWithValue(error.response?.data);
  }
});

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue, dispatch }) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    toast.success("Logged in successfully");
    dispatch(fetchDashboardData());
    dispatch(fetchUploadHistory());
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
    return rejectWithValue(error.response?.data);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await axiosInstance.post("/auth/logout");
    toast.success("Logout successful");
    return null;
  } catch (error) {
    toast.error(error.response?.data?.message || "Logout failed");
    return rejectWithValue(error.response?.data);
  }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (data, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.post("/auth/update-profile", data);
    toast.success("Profile updated successfully");
    return res.data;
  } catch (error) {
    console.error("Error in updateProfile: ", error);
    toast.error(error.response?.data?.message || "Profile update failed");
    return rejectWithValue(error.response?.data);
  }
});

// Initial State

const initialState = {
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
};

// Slice

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.authUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isCheckingAuth = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isCheckingAuth = false;
        state.authUser = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isCheckingAuth = false;
        state.authUser = null;
      })

      // Signup
      .addCase(signup.pending, (state) => {
        state.isSigningUp = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isSigningUp = false;
        state.authUser = action.payload;
      })
      .addCase(signup.rejected, (state) => {
        state.isSigningUp = false;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.isLoggingIn = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggingIn = false;
        state.authUser = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggingIn = false;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.authUser = null;
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isUpdatingProfile = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isUpdatingProfile = false;
        state.authUser = action.payload;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isUpdatingProfile = false;
      });
  },
});

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer;
