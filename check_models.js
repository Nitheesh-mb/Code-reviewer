import dotenv from "dotenv";

dotenv.config({ path: "./BackEnd/.env" });

async function checkModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GOOGLE_GEMINI_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.models) {
      console.log("Models found:");
      data.models.forEach(m => {
        if (m.name.includes("flash") || m.name.includes("pro")) {
          console.log(`- ${m.name}`);
        }
      });
    } else {
      console.log("No models found or error:", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("Error fetching models:", error.message);
  }
}

checkModels();
