import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Track mobile menu state

  const menuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0">
      {/* Logo */}
      <Link to={!user ? "/" : "/dashboard"} className="text-2xl font-bold text-blue-600">
        Quizo
      </Link>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {!user ? (
          // Show Login if user is not logged in
          <Button
            onClick={() => navigate("/register")}
            className="bg-blue-500 text-white"
          >
            Register
          </Button>
        ) : (
          // Show Create Quiz & Logout if user is logged in
          <>
            <Link
              to="/dashboard"
              className="font-semibold flex items-center justify-center mr-2 mt-2 hidden sm:block"
            >
              Dashboard
            </Link>
            <Button
              onClick={() => navigate("/create-quiz")}
              className="bg-green-500 text-white hidden sm:flex sm:flex-row"
            >
               <FaPlus /> Create Quiz
            </Button>
            <Button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="bg-red-500 text-white hidden sm:flex sm:flex-row "
            >
              <FaSignOutAlt /> Logout
            </Button>

            <button className="sm:hidden text-xl font-semibold" onClick={menuToggle}>
              {menuOpen ? (
                <i className="ri-close-line"></i>
              ) : (
                <i className="ri-menu-5-line"></i>
              )}
            </button>

            {menuOpen && (
              <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col gap-4 p-5 sm:hidden" onClick={menuToggle}>
                <Link
                  to="/dashboard"
                  className="font-semibold text-center"
                  onClick={menuToggle}
                >
                  Dashboard
                </Link>
                <Button
                  onClick={() => navigate("/create-quiz")}
                  className="bg-green-500 text-white sm:flex sm:flex-row"
                >
                  <FaPlus /> Create Quiz
                </Button>
                <Button
                  onClick={() => {
                    logout();
                    navigate("/");
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 text-white flex justify-center items-center sm:flex sm:flex-row"
                >
                  <FaSignOutAlt /> Logout
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
