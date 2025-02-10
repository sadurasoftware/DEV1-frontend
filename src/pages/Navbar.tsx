import { Link, useNavigate } from "react-router-dom"
import { logout } from "@/apis/logoutApi"
import { useLoginInfoStore } from "../store/useLoginInfoStore"
import { ModeToggle } from "@/components/mode-toggle"

export const Navbar: React.FC = () => {
  const { token, clearLoginInfo, user } = useLoginInfoStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      if (token) {
        await logout({ token, clearLoginInfo })
        navigate("/login")
      }
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <div className='bg-indigo-500 p-4 sticky top-0 h-20'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <div className='text-white text-xl font-semibold'>
          <Link
            to='/'
            className='text-white hover:text-blue-400 transition-colors'>
            App
          </Link>
        </div>

        <div className='flex space-x-6 items-center'>
          {token ? (
            <div className='flex space-x-6'>
              <button
                className='text-white hover:text-blue-400 transition-colors'
                onClick={handleLogout}>
                Logout
              </button>

              {user?.roleId === 3 && (
                <Link
                  to='/dashboard'
                  className='text-white hover:text-blue-400 transition-colors'>
                  Dashboard
                </Link>
              )}

              {user?.roleId === 1 && (
                <div className='flex space-x-6'>
                  <Link
                    to='/register'
                    className='text-white hover:text-blue-400 transition-colors'>
                    Add User
                  </Link>
                  <Link
                    to='/super-admin'
                    className='text-white hover:text-blue-400 transition-colors'>
                    Super Admin Dashboard
                  </Link>
                  <Link
                    to='/settings'
                    className='text-white hover:text-blue-400 transition-colors'>
                    Settings
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className='flex space-x-6'>
              <Link
                to='/register'
                className='text-white hover:text-blue-400 transition-colors'>
                Register
              </Link>
              <Link
                to='/login'
                className='text-white hover:text-blue-400 transition-colors'>
                Login
              </Link>
            </div>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
