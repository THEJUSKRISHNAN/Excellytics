import './App.css';
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
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
import WelcomePage from './pages/WelcomePage';
import ExcelUpload from './pages/ExcelUploadPage';
import Navbar from "./components/common/Navbar";
import HistoryPage from "./pages/HistoryPage"
import DashboardPage from './pages/DashboardPage';
import SidebarLayout from './layouts/SidebarLayout';

function App() {

  const dispatch = useDispatch();

  const location = useLocation();
  const currentPath = location.pathname;
  const showNavbarRoutes = ["/", "/login", "/signup", "/forgotpassword", "/resetpassword"];
  const showNavbar = showNavbarRoutes.includes(currentPath);



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
      {showNavbar && <Navbar />}


      <Routes>
        <Route path="/" element={!authUser ? <WelcomePage /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />

        {/* Protected Sidebar Routes */}
        <Route element={<SidebarLayout />}>
          <Route path="/dashboard" element={authUser ? <DashboardPage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/excelupload" element={authUser ? <ExcelUpload /> : <Navigate to="/login" />} />
          <Route path='/history' element={authUser ? <HistoryPage /> : <Navigate to="/login" />} />
        </Route>

      </Routes>

      <Toaster />
    </>


  )
}

export default App
