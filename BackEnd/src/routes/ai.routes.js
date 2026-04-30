import express from "express";
import { reviewCode, getReviewHistory } from "../controllers/ai.controllers.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protect these routes
router.post("/review", protect, reviewCode);
router.get("/history", protect, getReviewHistory);

export default router;