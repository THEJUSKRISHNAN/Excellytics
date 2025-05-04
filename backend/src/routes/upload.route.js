import express from "express";
import { uploadFile, history, downloadFile , getDashboardStats} from "../controllers/upload.controller.js";
import multer from "multer";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/uploadFile",protectRoute,upload.single("file"),uploadFile);

router.get("/history",protectRoute,history);

router.post("/downloadFile",protectRoute,downloadFile);

router.get('/dashboard',protectRoute,  getDashboardStats)


export default router;