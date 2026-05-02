import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: "./BackEnd/.env" });

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
  try {
    const models = await genAI.listModels();
    console.log(JSON.stringify(models, null, 2));
  } catch (error) {
    console.error("Error listing models:", error.message);
  }
}

listModels();
