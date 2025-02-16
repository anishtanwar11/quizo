import express from "express";
import cors from "cors";
import connectDB from "./config/db";

const app = express();

// ✅ Fix CORS to allow requests from frontend
app.use(cors({
  origin: "https://quizoooo.vercel.app",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// ✅ Import Routes
import authRouter from "./routes/auth";
import quizeRouter from "./routes/quize";

// ✅ Use Routes
app.use("/api/auth", authRouter);
app.use("/api/quiz", quizeRouter);

// ✅ Connect Database
connectDB()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });

// ✅ Instead of app.listen(), export app for Vercel
export default app;
