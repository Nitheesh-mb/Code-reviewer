import express from "express";
import { reviewCode, getReviewHistory } from "../controllers/ai.controllers.js";

const router = express.Router();

// Public routes (no auth for now)
router.post("/review", reviewCode);
router.get("/history", getReviewHistory);

export default router;