import { pool } from "../config/db.js";

// GET /user/profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // auth middleware sets req.user
    const result = await pool.query(
      "SELECT name, email, food_pref FROM users WHERE id=$1",
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

// PUT /user/profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { food_pref } = req.body;

    if (!food_pref) {
      return res.status(400).json({ message: "food preference is required" });
    }

    await pool.query(
      "UPDATE users SET food_pref=$1 WHERE id=$2",
      [food_pref, userId]
    );

    res.status(200).json({ message: "profile updated successfully" });
  } catch (err) {
    console.error("updateProfile error:", err);
    res.status(500).json({ message: "server error" });
  }
};
