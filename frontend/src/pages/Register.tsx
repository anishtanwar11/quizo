import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUser } from "../api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await registerUser(username, password);
      console.log("response=", response);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/"), 2000); // Redirect to login after 2 seconds
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while registering.");
      }
      console.error("error", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <div className="mb-4">
          <h2 className="text-2xl font-bold ">Register</h2>
          <Link to="/" className="text-sm font-semibold">
            Already have an account?{" "}
            <span className="text-blue-600">Sign in</span>
          </Link>
        </div>
        
        {error && (
          <p className="text-red-500 text-sm text-center my-2 border border-red-500 border-dashed rounded-[25px] py-1">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 text-sm text-center my-2 border border-green-500 border-dashed rounded-[25px] py-1">
            {success}
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
        <Input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2 mb-2"
        />

        <Button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default Register;
