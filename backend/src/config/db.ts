import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// ✅ Use `DATABASE_URL` instead of `DB_HOST`
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for Supabase connection
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("✅ Connected to PostgreSQL Database!");
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1);
  }
};

export { pool, connectDB};
