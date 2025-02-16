import express, { Request, Response } from "express";
import { pool } from "../config/db";

const router = express.Router();

// ✅ Create a New Quiz
router.post("/quizzes", async (req: Request, res: Response) => {
  const { title, description, teacher_id } = req.body;

  if (!title || !description || !teacher_id) {
    res.status(400).json({ message: "All fields are required" });
    return ;
  }

  try {
    const result = await pool.query(
      "INSERT INTO quizzes (title, description, teacher_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, teacher_id]
    );

    res.status(200).json({ 
      message: "Quiz created successfully!", 
      quiz: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating quiz", error });
  }
});

//? Fetch Quizzes for Logged-in Teacher
router.get("/quizzes", async (req: Request, res: Response) => {
  const { teacher_id } = req.query;

  if (!teacher_id){
     res.status(400).json({ message: "Teacher ID is required" });
     return;
  } 

  try {
    const result = await pool.query(
      "SELECT * FROM quizzes WHERE teacher_id = $1",
      [teacher_id]
    );

    console.log("Result=", result);
    

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes", error });
  }
});

// Get Single Quiz by ID
router.get("/quizzes/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM quizzes WHERE id = $1", [id]);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz", error });
  }
});

// Update Quiz
router.put("/quizzes/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({ message: "Title and description are required" });
    return ;
  }

  try {
    const result = await pool.query(
      "UPDATE quizzes SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );

    if (result.rowCount === 0) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    res.status(200).json({ 
      message: "Quiz updated successfully!", 
      quiz: result.rows[0] 
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating quiz", error });
  }
});

// Delete Quiz
router.delete("/quizzes/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM quizzes WHERE id = $1 RETURNING *", [id]);

    if(result.rowCount === 0){
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    res.status(200).json({ message: "Quiz deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting quiz", error });
  }
});

export default router;
