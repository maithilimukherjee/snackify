import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import recommendRoute from "./routes/recommendRoutes.js";

console.log("app.js loaded");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", recommendRoute);

app.get("/api/auth/health", (req, res) => {
  res.json({ status: "backend up" });
});

export default app;
