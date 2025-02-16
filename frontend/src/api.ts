import axios from "axios";

const API_URL = "http://localhost:5000/api";

//? User Register
export const registerUser = async (username: string, password: string) =>{
    const response = await axios.post(`${API_URL}/register`, {username, password});
    return response.data;
}

//? User Login
export const loginUser = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

//? Fetch quizzes only for logged-in teacher
export const fetchQuizzes = async (teacherId: number) => {
  const response = await axios.get(`http://localhost:5000/api/quizzes?teacher_id=${teacherId}`);
  return response.data;
};

// //? Fetch Quizzes
// export const fetchQuizzes = async () => {
//   const response = await axios.get(`${API_URL}/quizzes`);
//   return response.data;
// };

//? Create Quiz
export const createQuiz = async (title: string, description: string, teacher_id: number) => {
  const response = await axios.post(`${API_URL}/quizzes`, { title, description, teacher_id });
  return response.data;
};

//? Fetch Quiz by ID
export const getQuizById = async (id: number) => {
  const response = await axios.get(`${API_URL}/quizzes/${id}`);
  return response.data;
};

//? Update Quiz
export const updateQuiz = async (id: number, title: string, description: string) => {
  const response = await axios.put(`${API_URL}/quizzes/${id}`, { title, description });
  return response.data;
};

//? Delete Quiz
export const deleteQuiz = async (id: number) => {
  await axios.delete(`${API_URL}/quizzes/${id}`);
};
