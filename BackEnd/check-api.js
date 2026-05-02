import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.GOOGLE_GEMINI_KEY;

async function listModels() {
  const genAI = new GoogleGenerativeAI(key);
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await response.json();
    if (data.models) {
      console.log(JSON.stringify(data.models.map(m => m.name), null, 2));
    } else {
      console.log("Error response:", data);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

listModels();
