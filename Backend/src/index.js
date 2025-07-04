import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import { connectdb } from "./lib/Db.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/message.route.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// ✅ Correct order — set limits BEFORE any route or middleware
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoute);

app.listen(PORT, () => {
  console.log("✅ Server running on port " + PORT);
  connectdb();
});
