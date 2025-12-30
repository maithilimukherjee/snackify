import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { auth } from "../controllers/authController.js";

const router = express.Router();

router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);

export default router;
