import React, { useState } from 'react';
import { useCreateRole } from '../hooks/useCreateRole';  
import { Link } from 'react-router-dom';

const RolePage: React.FC = () => {
 
  const [roleName, setRoleName] = useState<string>(''); 

  const { mutate, isPending, isError, isSuccess, error, data } = useCreateRole();

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleName(e.target.value);
  };

  
  const roleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      
      if (roleName.trim()) {
        mutate({ name: roleName });  
      }
    } catch (err) {
      console.error("Error during role creation:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">Manage Roles</h2>

      
      <form onSubmit={roleSubmit} className="space-y-4">
        <div>
          <label htmlFor="roleName" className="block text-gray-700">Role Name</label>
          <input
            type="text"
            id="roleName"
            name="roleName"
            value={roleName}  
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        
        {isError && error && (
          <div className="text-red-600 text-center mt-2">{error.message}</div>
        )}

        
        {isSuccess && data && (
          <div className="text-green-600 text-center mt-2">Role created successfully!</div>
        )}

        
        <div className="text-center mt-4">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
            disabled={isPending}
          >
            {isPending ? 'Creating Role...' : 'Create Role'}
          </button>

          <div className="text-center mt-4">
        <Link to="/settings" className="text-blue-500 hover:text-blue-700">
          Back to Settings
        </Link>
      </div>

        </div>
      </form>
    </div>
  );
};

export default RolePage;
