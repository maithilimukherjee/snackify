import express from "express";
import { getProfile } from "../controllers/profileController.js";
import { auth } from "../controllers/authController.js";

const router = express.Router();

router.get("/profile", auth, getProfile);

export default router;
