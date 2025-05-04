import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import uploadRoute from "./routes/upload.route.js"
import connectDB  from "./config/db.js";
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express();

dotenv.config();
const PORT = process.env.PORT;

// extract json data from body
app.use(express.json());

// help to get cookie
app.use(cookieParser());


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth",authRoutes)
app.use("/api/upload",uploadRoute)

app.listen(PORT,()=>{
  console.log("server is running in port : " + PORT);
  connectDB();
});

app.get("/hi",(req,res)=>{
    res.send("excellytics here");
})