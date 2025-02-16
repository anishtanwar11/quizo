import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (user === null) {
    // ✅ Wait until the user state is loaded from localStorage
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
