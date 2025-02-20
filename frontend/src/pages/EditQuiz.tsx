import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getQuizById, updateQuiz } from "../api";

const EditQuiz = () => {
  const { id } = useParams<{ id: string }>(); // Get quiz ID from URL
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchQuiz = async () => {
      try {
        const quiz = await getQuizById(Number(id));
        setTitle(quiz.title);
        setDescription(quiz.description);
      } catch (error: any) {
        setError("Error loading quiz details.");
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleUpdateQuiz = async () => {
    if (!title || !description) {
      setError("All fields are required!");
      return;
    }

    try {
      await updateQuiz(Number(id), title, description);
      setSuccess("Quiz updated successfully! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error: any) {
      setError("An error occurred while updating the quiz.");
      console.error("Error updating quiz:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100  pt-24 pb-8">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Edit Quiz</h2>

        {error && (
          <p className="text-red-500 text-sm text-center my-2 border border-red-500 border-dashed rounded-lg py-1">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 text-sm text-center my-2 border border-green-500 border-dashed rounded-lg py-1">
            {success}
          </p>
        )}

        <Input
          type="text"
          placeholder="Quiz Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2"
        />
        <Textarea
          placeholder="Quiz Description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2"
          rows={15}
        />

        <Button
          onClick={handleUpdateQuiz}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Update Quiz
        </Button>
      </div>
    </div>
  );
};

export default EditQuiz;
