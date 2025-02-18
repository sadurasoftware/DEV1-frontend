import { useFetchUsers } from '@/hooks/useFetchUsers'
import { Link, useNavigate } from 'react-router-dom'

const Users = () => {
  const { usersLoading, users, isUsersError, usersError } = useFetchUsers()
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/super-admin')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">Users</h1>

        <button
          onClick={handleBack}
          className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Back to Dashboard
        </button>

        {/* Users Table */}
        {usersLoading && <p className="text-gray-500">Loading users...</p>}
        {isUsersError && (
          <p className="text-red-600">
            Error loading users: {usersError?.message}
          </p>
        )}

        {users && (
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Firstname</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Verified</th>
                  {/* <th className="px-4 py-2 text-left">Status</th> */}
                  <th className="px-4 py-2 text-left">Edit</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {users.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.firstname}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      {user.isVerified ? 'Verified' : 'Registered'}
                    </td>
                    <td className="px-4 py-2">
                      <Link to={`/edit/${user.id}`}>Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Users
