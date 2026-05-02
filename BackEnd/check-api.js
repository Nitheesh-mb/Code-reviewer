import { GoogleGenerativeAI } from "@google/generative-ai";

const key = "AIzaSyCDU4jbjoZPRpGLI_eTOOiHSwu1MzwP-zQ";

async function listModels() {
  const genAI = new GoogleGenerativeAI(key);
  try {
    const models = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // Actually, listing models is done via a different endpoint.
    // I'll use fetch.
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await response.json();
    console.log(JSON.stringify(data.models.map(m => m.name), null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

listModels();
