import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchQuizzes, deleteQuiz } from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchQuizzes(user.userId)
        .then(setQuizzes)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-6 sm:p-6 mt-16">
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-center w-full sm:text-left">Hello 👋 <span className="uppercase">{user.username}</span></h2>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : quizzes.length === 0 ? (
        // Show message & "Create Quiz" button if no quizzes exist
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-gray-500 text-lg ">You haven't created any quizzes yet.</p>
          <Button onClick={() => navigate("/create-quiz")} className="bg-green-500 text-white mt-4">
            <FaPlus /> Create Quiz
          </Button>
        </div>
      ) : (
        // Show quizzes if they exist
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((quiz: any) => (
            <Card key={quiz.id} className="">
              <CardHeader>
                <CardTitle> {quiz.title}</CardTitle>
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
                      setQuizzes(quizzes.filter(q => q.id !== quiz.id)); // Remove quiz from state after deletion
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
