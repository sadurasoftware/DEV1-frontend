import React, { useState } from 'react';

const RolePage: React.FC = () => {
  const [roles, setRoles] = useState<any[]>([]);  
  const [roleName, setRoleName] = useState<string>(''); 
  const [editingRole, setEditingRole] = useState<any | null>(null); 
  const [apiError, setApiError] = useState<string | null>(null); 

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleName(e.target.value);
  };

  
  const handleAddRole = (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
 
    setRoles([...roles, { id: roles.length + 1, name: roleName }]);
    setRoleName(''); 
  };

  const handleEditRole = (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    setRoles(roles.map((role) => (role.id === editingRole.id ? { ...role, name: roleName } : role)));
    setEditingRole(null); 
    setRoleName('');  
  };

  const handleDeleteRole = (id: number) => {
    setRoles(roles.filter((role) => role.id !== id));
  };
 
  const handleEditButtonClick = (role: any) => {
    setEditingRole(role);
    setRoleName(role.name); 
  };


  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">Manage Roles</h2>

      <form onSubmit={editingRole ? handleEditRole : handleAddRole} className="space-y-4">
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

        <div className="text-center mt-4">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
          >
            {editingRole ? 'Update Role' : 'Add Role'}
          </button>
        </div>
      </form>

      {apiError && <p className="text-red-500 text-center mt-4">{apiError}</p>}

      {/* <h3 className="text-xl mt-6">Existing Roles</h3> */}
      <ul className="space-y-4 mt-4">
        {roles.map((role) => (
          <li key={role.id} className="flex justify-between items-center">
            <span>{role.name}</span>
            <div>
              <button
                onClick={() => handleEditButtonClick(role)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteRole(role.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RolePage;
