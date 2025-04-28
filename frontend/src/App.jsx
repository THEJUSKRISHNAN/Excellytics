import './App.css';
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { useEffect } from 'react';
import { Loader } from "lucide-react";
import { Toaster } from 'react-hot-toast';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from './store/auth-slice/authSlice';

function App() {

  const dispatch = useDispatch();

  // Accessing Redux state
  const authUser = useSelector((state) => state.auth.authUser);
  const isCheckingAuth = useSelector((state) => state.auth.isCheckingAuth);


  useEffect(() => {
    dispatch(checkAuth()); // Dispatch checkAuth thunk
  }, [dispatch]);


  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }



  return (

      <>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={ authUser ? <ProfilePage /> : <Navigate to = '/login'/> } />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />

      </Routes>

      <Toaster />
    </>
      

  )
}

export default App
