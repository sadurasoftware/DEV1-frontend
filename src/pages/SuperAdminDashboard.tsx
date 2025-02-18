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
    navigate('/users')
  }

  const handleShowAdmins = () => {
    navigate('/admins')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Super Admin Dashboard
        </h1>

        {token && (
          <h1 className="text-xl font-medium text-gray-700 mb-6">
            Welcome, {user?.firstname}
          </h1>
        )}

        <div className="flex space-x-4 mb-6">
          <button
            onClick={handleShowUsers}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Show Users
          </button>
          <button
            onClick={handleShowAdmins}
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition duration-200"
          >
            Show Admins
          </button>
        </div>
      </div>
    </div>
  )
}
