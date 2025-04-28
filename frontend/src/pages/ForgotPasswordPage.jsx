import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../services/axios";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid email format");
            await axiosInstance.post("/auth/forgotpassword", { email });
            toast.success("Password reset link sent to your email!.");
            toast('Redirecting to login page...', {
                icon: '🔒',
              });
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            toast.error("Fail to send mail. Try again.");
            console.log(error);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center flex-col bg-gray-100 text-center">
            <div className="bg-white p-10 rounded-2xl">
                <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 w-full mb-4"
                        required
                    />
                    <button className="btn bg-green-500 w-full rounded-2xl text-white font-bold text-lg" type="submit">
                        Send Reset Link
                    </button>
                </form>
            </div>

        </div>
    );
}
