import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("AI Code Reviewer API Running...");
});

export default app;