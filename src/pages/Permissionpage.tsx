import React, { useState } from 'react';

const Permissionpage: React.FC = () => {
  const [permissions, setpermissions] = useState<any[]>([]);  
  const [permissionsName, setPermissionsName] = useState<string>(''); 
  const [editingPermissions, setEditingPermissions] = useState<any | null>(null); 
  const [apiError, setApiError] = useState<string | null>(null); 

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPermissionsName(e.target.value);
  };

  
  const handleAddPermission = (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
 
    setpermissions([...permissions, { id: permissions.length + 1, name: permissionsName }]);
    setPermissionsName(''); 
  };

  const handleEditPermissions = (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    setpermissions(permissions.map((permissions) => (permissions.id === editingPermissions.id ? { ...permissions, name: permissionsName } : permissions)));
    setEditingPermissions(null); 
    setPermissionsName('');  
  };

  const handleDeletePermission = (id: number) => {
    setpermissions(permissions.filter((permissions) => permissions.id !== id));
  };
 
  const handleEditButtonClick = (permissions: any) => {
    setEditingPermissions(permissions);
    setPermissionsName(permissions.name); 
  };


  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">Manage Permissions</h2>

      <form onSubmit={editingPermissions ? handleEditPermissions : handleAddPermission} className="space-y-4">
        <div>
          <label htmlFor="permissionName" className="block text-gray-700">Permission Name</label>
          <input
            type="text"
            id="permissionName"
            name="permissionName"
            value={permissionsName}
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
            {editingPermissions ? 'Update permission' : 'Add permission'}
          </button>
        </div>
      </form>

      {apiError && <p className="text-red-500 text-center mt-4">{apiError}</p>}

      <ul className="space-y-4 mt-4">
        {permissions.map((permissions) => (
          <li key={permissions.id} className="flex justify-between items-center">
            <span>{permissions.name}</span>
            <div>
              <button
                onClick={() => handleEditButtonClick(permissions)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePermission(permissions.id)}
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

export default Permissionpage;
