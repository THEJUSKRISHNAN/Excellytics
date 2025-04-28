import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
