import express from "express";
import { register, login, auth } from "../controllers/authController.js";
import { pool } from "../config/db.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, async (req, res) => {
  const data = await pool.query("SELECT * FROM users WHERE id=$1", [
    req.user.id,
  ]);

  res.json(data.rows[0]);
});

router.get("/health", (req, res) => {
  res.json({ status: "backend up ✅" });
});


export default router;
