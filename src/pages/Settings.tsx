import { useNavigate } from "react-router-dom";

export const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Settings</h1>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/adminpermission")}
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
            onClick={() => navigate("/rolepage")}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Add Role  
          </button>
          <button
            onClick={() => navigate("/permissionpage")}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Add Permission  
          </button>
        </div>
      </div>
    </div>
  );
};
