import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchQuizzes, deleteQuiz } from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<{ id: number; title: string; description: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fix: Move `useEffect` outside of condition
  useEffect(() => {
    if (user) {
      fetchQuizzes(user.userId)
        .then(setQuizzes)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user]); // ✅ Correct dependency

  // ✅ Fix: Return early only inside JSX, not before `useEffect`
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">You need to log in first.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:p-6 mt-16">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-center w-full sm:text-left">
          Hello 👋 <span className="uppercase">{user.username}</span>
        </h2>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : quizzes.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-gray-500 text-lg">You haven't created any quizzes yet.</p>
          <Button onClick={() => navigate("/create-quiz")} className="bg-green-500 text-white mt-4">
            <FaPlus /> Create Quiz
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((quiz) => (
            <Card key={quiz.id}>
              <CardHeader>
                <CardTitle>{quiz.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{quiz.description}</p>
                <div className="flex flex-row gap-4 mt-4">
                  <Button onClick={() => navigate(`/edit/${quiz.id}`)} className="bg-yellow-500">
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      await deleteQuiz(quiz.id);
                      setQuizzes(quizzes.filter((q) => q.id !== quiz.id)); // ✅ Remove quiz from state
                    }}
                  >
                    <FaTrash /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
