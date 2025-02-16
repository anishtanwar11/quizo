import express from "express";
import cors from "cors";
import connectDB from "./config/db"
const app = express();

import authRouter from "./routes/auth";
import quizeRouter from "./routes/quize";

app.use(cors());
app.use(express.json());


const port = 5000;

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
