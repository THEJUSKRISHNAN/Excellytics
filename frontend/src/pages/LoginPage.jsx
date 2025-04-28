import { useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, FileChartColumnIncreasing } from "lucide-react";
import toast from "react-hot-toast";
import { login } from "../store/auth-slice/authSlice"; 


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  // Get the loading state from Redux store
  const { isLoggingIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      dispatch(login(formData)); // Dispatch login action to Redux store
    }

  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 h-screen bg-gray-100">
        <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center 
                "
              >
               <FileChartColumnIncreasing className="w-8 h-8  text-green-500 hover:text-green-700"/>
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input w-full pl-10 focus:border-none`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 focus:border-none`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
                <p className="text-base-content/60">
 
            </p>
              </div>
            </div>
            <div className="text-center ">
                <Link to="/forgotpassword" className="link link-primary text-green-500 hover:text-green-700 font-semibold">
                Forgot Password
              </Link>

                </div>

            <button type="submit" className="btn bg-green-500 w-full rounded-2xl text-white font-bold text-lg" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary text-green-500 hover:text-green-700 font-semibold">
                Create account
              </Link>
            </p>
            
          </div>
        </div>
      </div>
      </div>
  );
};

export default LoginPage;
