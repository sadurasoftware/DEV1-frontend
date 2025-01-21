import { Link, useNavigate } from "react-router-dom";
import { logout } from "@/apis/logoutApi"; // Import your logout function
import { useLoginInfoStore } from "../store/useLoginInfoStore"; // Import the store hook

export const Navbar = () => {
  const navigate = useNavigate();

  // Get token and username from the store
  const token = useLoginInfoStore((state) => state.token);
  const username = useLoginInfoStore((state) => state.username);

  const handleLogout = async () => {
    if (token && username) {
      try {
        
        await logout(token, username);
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        
      }
    } else {
      console.error("Token or username is null, cannot logout.");
      
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
