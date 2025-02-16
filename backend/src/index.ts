import express from "express";
import cors from "cors";
import connectDB from "./config/db"
const app = express();

import authRouter from "./routes/auth";
import quizeRouter from "./routes/quize";

app.use(express.json());
app.use(cors({
  origin: "https://quizoooo.vercel.app/",
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true
}))


const port = process.env.PORT || 5000;

// Use the authentication routes correctly
app.use("/api", authRouter);
app.use("/api", quizeRouter);

//  Call the database connection function
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("App is hosted on localhost:" + port);
    });
  })
  .catch((error: unknown) => {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  });
