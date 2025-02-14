import { useNavigate } from 'react-router-dom'
export const Settings = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Settings</h1>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/super-admin-permissions')}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Admin User Permission
          </button>
          {/* 
          <button
            onClick={() => navigate("/userpermission")}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            User Permission
          </button> */}
          <button
            onClick={() => navigate('/roles')}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Roles
          </button>
          <button
            onClick={() => navigate('/permissions')}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Permissions
          </button>
          <button
            onClick={() => navigate('/modules')}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Modules
          </button>
        </div>
      </div>
    </div>
  )
}
