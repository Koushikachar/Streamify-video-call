// api/index.js
import serverless from "serverless-http";
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "../routes/authRoutes.js";
import userRoutes from "../routes/userRoutes.js";
import chatRoutes from "../routes/chatRoutes.js";
import { connectDB } from "../lib/db.js";

const app = express();

// CORS: allow frontend origin via env var on Vercel
const CLIENT_ORIGIN = https://streamify-video-calling-cyan.vercel.app/;

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// Optional: serve static files if you still want to (not needed for Vercel static-build)
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

// Connect DB (runs when function cold-starts — fine)
connectDB().catch((err) => {
  console.error("DB connection error:", err);
});

export default serverless(app);
