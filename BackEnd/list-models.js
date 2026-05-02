import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
  try {
    const result = await genAI.listModels();
    console.log("Available Models:");
    result.models.forEach(m => console.log(`- ${m.name}`));
  } catch (error) {
    console.error("Error listing models:", error.message);
  }
}

listModels();
