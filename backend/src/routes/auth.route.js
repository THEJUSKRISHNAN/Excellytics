import express from "express";
import { login, logout, signup, updateProfile, checkAuth,forgotPassword,resetPassword } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/update-Profile",protectRoute,updateProfile);

router.post("/forgotpassword",forgotPassword);

router.post('/resetpassword', resetPassword);

router.get("/check",protectRoute,checkAuth);


export default router;