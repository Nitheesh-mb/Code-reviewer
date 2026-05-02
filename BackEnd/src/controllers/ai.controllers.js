import { generateReview } from "../services/ai.service.js";
import Review from "../models/review.model.js";

export const reviewCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    console.log("HEADERS:", req.headers.authorization);
    console.log("USER:", req.user);
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is required",
      });
    }

    const review = await generateReview(code, language);

    const savedReview = await Review.create({
      code,
      language: language || "javascript",
      review,
      user: req.user._id 
    });

    res.status(200).json({
      success: true,
      review: savedReview,
    });

  } catch (error) {
    console.error("Controller Error:", error.message);

    if (error.message.includes("429")) {
      return res.status(429).json({
        success: false,
        message: "AI Rate limit reached. Please wait a minute before trying again.",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const getReviewHistory = async (req, res) => {
  try {
    const reviews = await Review.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      reviews,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};