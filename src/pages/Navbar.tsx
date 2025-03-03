import { logout } from '@/apis/logoutApi'
import { ModeToggle } from '@/components/mode-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginInfoStore } from '../store/useLoginInfoStore'

export const Navbar: React.FC = () => {
  const { token, clearLoginInfo, user } = useLoginInfoStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      if (token) {
        await logout({ token, clearLoginInfo })
        navigate('/login')
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div
      className="p-4 sticky top-0 h-20 border-b bg-sky-100 dark:bg-sky-950 dark:text-white"
      aria-labelledby="main-nav"
    >
      <div className="max-h-screen mx-auto flex justify-between items-center">
        <Link to="/" className=" hover:text-blue-400 transition-colors">
          App
        </Link>

        <div className="flex space-x-6 items-center">
          {token ? (
            <div className="flex space-x-6">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png" />
                    <AvatarFallback>user</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>user name</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user?.roleId === 3 && (
                    <DropdownMenuItem>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  {user?.roleId === 3 && (
                    <DropdownMenuItem>
                      <Link to="/create-ticket">Create New Ticket</Link>
                    </DropdownMenuItem>
                  )}
                  {user?.roleId === 1 && (
                    <>
                      <DropdownMenuItem>
                        <Link to="/register">Add User</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/super-admin">Super Admin Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to="/settings">Settings</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem>
                    <button onClick={handleLogout} aria-label="logout">
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex space-x-6">
              <Link
                to="/register"
                className=" hover:text-blue-400 transition-colors"
              >
                Register
              </Link>
              <Link
                to="/login"
                className=" hover:text-blue-400 transition-colors"
              >
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
