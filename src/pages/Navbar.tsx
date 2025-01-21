import { Link, useNavigate } from "react-router-dom";
import { logout } from "@/apis/logoutApi"; // Import your logout function


export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    
      try {
        
        await logout();
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        
      }
   
  };

  return (
    <div className="bg-gray-500 p-4">
      <div className="flex space-x-6 justify-end">
        <Link
          to="/register"
          className="text-white hover:text-blue-400 transition-colors"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="text-white hover:text-blue-400 transition-colors"
        >
          Login
        </Link>
        <button
          className="text-white hover:text-blue-400 transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
