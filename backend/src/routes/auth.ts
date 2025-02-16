import express from "express";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { pool } from "../config/db";

const router = express.Router();

// Register a New User
router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }

  try {
    const lowercaseUsername = username.toLowerCase(); // Convert to lowercase

    const existingUser = await pool.query("SELECT * FROM users WHERE username = $1", 
      [lowercaseUsername]
    );

    if (existingUser.rows.length > 0) {
      res.status(401).json({ message: "Username already exists!" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [lowercaseUsername, hashedPassword]
    );

    res.status(201).json({ 
      message: "User registered successfully!", 
      user: result.rows[0] 
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// Login User
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }

  try {
    // Fetch user from database
    const result = await pool.query("SELECT * FROM users WHERE username = $1", 
      [username]
    );

    const user = result.rows[0];
    if (!user) {
      res.status(401).json({ message: "Invalid username" });
      return;
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }
    console.log("User=", user);

    res.status(200).json({
      message: "Login successful!",
      userId: user.id,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

export default router;
