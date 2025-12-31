import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import recommendRoute from "./routes/recommendRoutes.js";
import profileRoute from "./routes/profileRoute.js";
import ideasRoute from "./routes/ideasRoute.js";

console.log("app.js loaded");

const app = express();

app.use(cors({
  origin: "https://snackify-three.vercel.app",
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", recommendRoute);
app.use("/api/user", profileRoute);
app.use("/api", ideasRoute);


app.get("/api/auth/health", (req, res) => {
  res.json({ status: "backend up" });
});

export default app;
