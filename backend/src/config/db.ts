import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432, // Default PostgreSQL port
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};

export default connectDB;
