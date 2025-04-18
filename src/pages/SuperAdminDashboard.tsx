import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginInfoStore } from '../store/useLoginInfoStore'

export const SuperAdminDashboard = () => {
  const { token, user } = useLoginInfoStore()
  console.log('User in Dashboard:', user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  const handleShowUsers = () => {
    navigate('/users')
  }

  const handleShowAdmins = () => {
    navigate('/admins')
  }

  const handleShowTickets = () => {
    navigate('/tickets')
  }



  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="container mx-auto max-w-4xl  p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>

        {token && (
          <div>
            <h1 className="text-xl font-medium text-gray-700 mb-2">
              Welcome, {user?.firstname}
            </h1>
            {user?.roleId === 1 && (
              <h2 className="text-lg text-gray-600 mb-4">Super admin</h2>
            )}


          </div>

        )}

        <div className="flex space-x-4 mb-6">
          {(user?.roleId === 1 || user?.roleId === 2) && (<button
            onClick={handleShowUsers}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Show Users
          </button>)}

          {(user?.roleId === 1) && (<button
            onClick={handleShowAdmins}
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-200"
          >
            Show Admins
          </button>)}

          <button
            onClick={handleShowTickets}
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-200"
          >
            Tickets
          </button>

        </div>
      </div>
    </div>
  )
}
