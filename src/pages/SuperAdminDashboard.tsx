import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginInfoStore } from '../store/useLoginInfoStore'

export const SuperAdminDashboard = () => {
  const { token, user } = useLoginInfoStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  const handleShowUsers = () => {
    navigate('/users/1')
  }

  const handleShowAdmins = () => {
    navigate('/admins/1')
  }

  const handleShowTickets = () => {
    navigate(`/tickets/1`)
  }

  const handleShowMyTickets = () => {
    navigate(`/my-tickets/${user?.id}`)
  }

  const handleRaiseTickets = () => {
    navigate(`/create-ticket`)
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

          {(user?.roleId === 1 || user?.roleId === 2) && (<button
            onClick={handleShowTickets}
            className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition duration-200"
          >
            Tickets Dashboard
          </button>)}

          <button
            onClick={handleShowMyTickets}
            className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition duration-200"
          >
            My Tickets
          </button>

          <button
            onClick={handleRaiseTickets}
            className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Raise Ticket
          </button>

        </div>
      </div>
    </div>
  )
}
