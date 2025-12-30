import express from "express";
import { submitIdea } from "../controllers/ideasController.js";

const router = express.Router();

router.post("/ideas", submitIdea);

export default router;
