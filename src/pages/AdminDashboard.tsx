import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetAdmin } from '../hooks/useGetAdmin'
import { useLoginInfoStore } from '../store/useLoginInfoStore'

export const AdminDashboard = () => {
  const { token, user } = useLoginInfoStore()
  const userId = user?.id ? user.id : 0
  const { isLoading, data, isError, error } = useGetAdmin(userId)
  const { userData } = data || {}
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  const handleEditClick = () => {
    navigate(`/edit-admin-profile/${userId}`)
  }

  const handleShowUsers = () => {
    navigate('/users')
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      {/* <div className="flex justify-start space-x-4 mb-6"> */}
      <div className="flex justify-end space-x-4 mb-6">
        <button
          onClick={handleShowUsers}
          className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition duration-200"
        >
          Show Users
        </button>
      </div>

      <h1 className="text-center text-3xl font-semibold mb-6">
        Welcome to Your Dashboard
      </h1>

      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full h-10 w-10"></div>
        </div>
      )}

      {isError && (
        <p className="text-center text-red-500">{`Error loading user details: ${error?.message}`}</p>
      )}

      {data && userData && (
        <div className="flex justify-center">
          <div className="max-w-md w-full">
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <p className="text-center mt-4 text-lg font-semibold text-gray-500">
                <span className="font-bold">Name:</span> {userData.username}
              </p>
              <p className="text-center mt-4 text-lg font-semibold text-gray-500">
                <span className="font-bold">Email:</span> {userData.email}
              </p>
              <p className="text-center mt-4 text-lg font-semibold text-gray-500">
                <span className="font-bold">Role:</span> {userData.roleId}
              </p>
              <p className="text-center mt-4 text-lg font-semibold text-gray-500">
                <span className="font-bold">Status:</span>{' '}
                {userData.isVerified ? 'Verified' : 'Registered'}
              </p>

              <div className="flex justify-center mt-6">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
