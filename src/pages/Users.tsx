import { useDeleteUserById } from '@/hooks/useDeleteUserById'
import { useFetchUsers } from '@/hooks/useFetchUsers'
import { Link, useNavigate } from 'react-router-dom'

const Users = () => {
  const { usersLoading, users, isUsersError, usersError, refetch } =
    useFetchUsers()
  const { deleteUser, deleteUserPending } = useDeleteUserById()
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/dashboard')
  }

  // const handleDelete = async (userId: number) => {
  //   try {
  //     await deleteUser(userId)
  //     refetch()
  //   } catch (error) {
  //     console.error('Error deleting user:', error)
  //   }
  // }

  const handleDelete = (id: number) => {
    deleteUser(id, {
      onSuccess: () => {
        refetch()
      },
    })
  }
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="">
        <h1 className="text-3xl font-semibold mb-4">Users</h1>

        <button
          onClick={handleBack}
          className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Back to Dashboard
        </button>

        {usersLoading && <p className="text-gray-500">Loading users...</p>}
        {isUsersError && (
          <p className="text-red-600">
            Error loading users: {usersError?.message}
          </p>
        )}

        {users && (
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full table-auto shadow-md rounded-lg">
              <thead className="">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Firstname</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Verified</th>
                  <th className="px-4 py-2 text-left">Edit</th>
                  <th className="px-4 py-2 text-left">Trash</th>
                </tr>
              </thead>
              <tbody className="">
                {users.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.firstname}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      {user.isVerified ? 'Verified' : 'Registered'}
                    </td>
                    <td>
                      <button className="bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 p-2">
                        <Link to={`/edit/${user.id}`} className="text-white">
                          Edit
                        </Link>
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 p-2"
                        onClick={() => handleDelete(user.id)}
                        disabled={deleteUserPending}
                      >
                        Delete
                      </button>
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
