import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";

const app = express();

// ✅ Enable CORS for frontend access
app.use(cors({
  origin: ["http://localhost:5173" , "https://quizoooo.vercel.app/"],  // Change this if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// ✅ Import Routes
import authRouter from "./routes/auth";
import quizRouter from "./routes/quize";

app.use("/api", authRouter);
app.use("/api", quizRouter);

// ✅ Connect to Database
connectDB()
  .then(() => console.log("✅ Database Connected!"))
  .catch((error) => {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1);
  });

// ✅ Use `app.listen(PORT)` because Render supports long-running servers
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
