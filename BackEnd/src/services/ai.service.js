import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export const generateReview = async (code, language) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
    
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const prompt = `
You are a senior software engineer.

Code Language: ${language || "javascript"}

Analyze the given code and respond ONLY in valid JSON format:

{
  "bugs": "list of bugs found",
  "improvements": "suggested improvements",
  "bestPractices": "relevant best practices",
  "refactoredCode": "the optimized version of the code"
}

IMPORTANT:
- Do NOT return anything outside JSON.
- If no bugs/improvements are found, say "No issues found".

Code:
${code}
`;

    console.log(`Requesting review for ${language}...`);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();

    console.log("AI Response received.");

    let parsed;
    try {
      const clean = rawText.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(clean);
    } catch (error) {
      console.error("JSON Parse Error:", rawText);
      parsed = { 
        bugs: "Could not parse AI response", 
        improvements: "See raw output", 
        bestPractices: "See raw output", 
        refactoredCode: rawText 
      };
    }

    return parsed;
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw error;
  }
};