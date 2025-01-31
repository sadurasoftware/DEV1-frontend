import React, { useState } from 'react';
import { PermissionTemplateUser } from '../types/userpermission';
import { Link } from 'react-router-dom';


const UserPermission: React.FC = () => {
  const [permissionData, setPermissionData] = useState<PermissionTemplateUser>({
    applicableOn: 'user',
    permissions: {
      view: false,
      update: false,
    },
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;

      setPermissionData((prevData) => ({
        ...prevData,
        permissions: {
          ...prevData.permissions,
          [name]: checked,
        },
      }));
    } else {
      setPermissionData({
        ...permissionData,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPermissionData({
      ...permissionData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    setApiError(null);

    try {
      // Reset form on success
      setPermissionData({
        applicableOn: 'user',
        permissions: {
          view: false,
          update: false,
        },
      });
    } catch (err) {
      setApiError('Failed to save permission template');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Permission Template</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="applicableOn" className="block text-gray-700">Applicable On</label>
          <select
            id="applicableOn"
            name="applicableOn"
            value={permissionData.applicableOn}
            onChange={handleSelectChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
          
            <option value="user">Users</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700">Assign Permissions</label>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="view"
              name="view"
              checked={permissionData.permissions.view}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="view">View</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="update"
              name="update"
              checked={permissionData.permissions.update}
              onChange={handleInputChange}
              className="mr-2"
            />
            <label htmlFor="update">Update</label>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
          >
            Save Permission Template
          </button>
        </div>
        <Link className="text-indigo-500 hover:text-indigo-600 text-center block mt-5" to="/settings"> Back to settings  </Link>  
      </form>

      {apiError && <p className="text-red-500 text-center mt-4">{apiError}</p>}
    </div>
  );
};

export default UserPermission;
