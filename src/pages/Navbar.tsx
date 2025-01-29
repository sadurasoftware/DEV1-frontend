import { Link, useNavigate } from 'react-router-dom';
import { logout } from '@/apis/logoutApi'; 
import { useLoginInfoStore } from '../store/useLoginInfoStore'; 


export const Navbar: React.FC = () => {
  const { token, clearLoginInfo, user } = useLoginInfoStore(); 
  const navigate = useNavigate();

   const handleLogout = async () => {
    try {
      if (token) {
        await logout({ token, clearLoginInfo }); 
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-gray-500 p-4">
      <div className="flex space-x-6 justify-end">
        {token ? (
          <div>
            <button
              className="text-white hover:text-blue-400 transition-colors mx-3"
              onClick={handleLogout}
            >
              Logout
            </button>
            <Link
            to="/dashboard"
            className="text-white hover:text-blue-400 transition-colors mx-3"
          >
            Dashboard
          </Link>

          {
          
          user?.roleName === 'superadmin' &&  
          <Link
          to="/register"
          className="text-white hover:text-blue-400 transition-colors mx-3"
        >
          Add User
        </Link>
          }

          </div>
            
        ) : (
          <>
            <Link
              to="/register"
              className="text-white hover:text-blue-400 transition-colors mx-3"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="text-white hover:text-blue-400 transition-colors mx-3"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
