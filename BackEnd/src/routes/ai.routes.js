import express from "express";
import { reviewCode, getReviewHistory } from "../controllers/ai.controllers.js";

const router = express.Router();

// Public routes (no auth for now)
import { protect } from "../middlewares/auth.middleware.js";

router.post("/review", protect, reviewCode);
router.get("/history", getReviewHistory);

export default router;