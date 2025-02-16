import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      console.log("response=", response);
      login({ userId: response.userId, username: response.username });
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <div className="mb-4">
          <h2 className="text-2xl font-bold ">Login</h2>
          <Link to="/register" className="text-sm font-semibold">
            New user? <span className="text-blue-600">Create an account</span>
          </Link>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center my-2 border-[1px] border-red-500 border-dashed rounded-[25px] py-1">
            {error}
          </p>
        )}

        <Input
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-2"
        />
        <Input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-2"
        />

        <Button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white p-2 rounded"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
