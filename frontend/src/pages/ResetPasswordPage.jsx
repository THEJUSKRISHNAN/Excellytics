import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../services/axios";

export default function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState("");
    const [token, setToken] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenFromUrl = params.get("token");
        console.log(tokenFromUrl)
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        } else {
            setMessage("Invalid or missing token.And redirecting to login page...");
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post("/auth/resetpassword", { token, newPassword });
            toast.success("Password reset successfully!")
            toast('Redirecting to login page...', {
                icon: '🔒',
              });
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            toast.error("Failed to reset password. Try again.")
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 text-center">
            <div className="max-w-md mx-auto mt-10 bg-white p-10 rounded-2xl">
                <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
                {message && <p className="mb-4">{message}</p>}
                {token && (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border p-2 w-full mb-4"
                            required
                        />
                        <button className="btn bg-green-500 w-full rounded-2xl text-white font-bold text-lg" type="submit">
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
