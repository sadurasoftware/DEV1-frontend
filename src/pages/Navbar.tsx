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
            {
              user?.roleId == 3 &&
              <div>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-blue-400 transition-colors mx-3"
                >
                  Dashboard
                </Link>
              </div>
            }


            {

              user?.roleId === 1 &&
              <div>
                  <Link
                  to="/register"
                  className="text-white hover:text-blue-400 transition-colors mx-3"
                >
                  Add User
                </Link>
                <Link
                  to="/super-admin"
                  className="text-white hover:text-blue-400 transition-colors mx-3"
                >
                  Dashboard
                </Link>
              </div>
                
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
