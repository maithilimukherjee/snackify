import { pool } from "../config/db.js";

// GET /user/profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // auth middleware sets req.user
    const result = await pool.query(
      "SELECT name, email FROM users WHERE id=$1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ message: "server error" });
  }
};

