import { useFetchAdmins } from '@/hooks/useFetchAdmins'
import { useNavigate } from 'react-router-dom'

const Admins = () => {
  const { adminLoading, admins, isAdminsError, adminsError } = useFetchAdmins()
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/super-admin')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">Admins</h1>

        <button
          onClick={handleBack}
          className="bg-gray-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Back to Dashboard
        </button>

        {/* Admins Table */}
        {adminLoading && <p className="text-gray-500">Loading admins...</p>}
        {isAdminsError && (
          <p className="text-red-600">
            Error loading admins: {adminsError?.message}
          </p>
        )}

        {admins && (
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Username</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Verified</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {admins.map((admin, index) => (
                  <tr key={admin.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{admin.username}</td>
                    <td className="px-4 py-2">{admin.email}</td>
                    <td className="px-4 py-2">
                      {admin.isVerified ? 'Verified' : 'Registered'}
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

export default Admins
