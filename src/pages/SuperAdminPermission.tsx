import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PermissionTemplateAdmin } from '../types/permissionTemplate';
import { useFetchPermissions } from '@/hooks/useFetchPermissions';

const SuperAdminPermission: React.FC = () => {
  const [permissionData, setPermissionData] = useState<PermissionTemplateAdmin>({
    name: '',
    description: '',
    applicableOn: 'admin',
    permissions: {
      create: false,
      view: false,
      update: false,
      delete: false,
      export: false,
    },
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);

  const { permissionsLoading, permissionsData, refetch } = useFetchPermissions();
  const { permission } = permissionsData || {};

  console.log(permission);

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
      // For text inputs and text areas
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

    // Simple validation
    // if (!permissionData.name) {
    //   setFormErrors((prev) => ({ ...prev, name: 'Permission template name is required' }));
    //   return;
    // }

    try {
      //   console.log('Permission template saved:', permissionData);
      // Reset the form on success
      setPermissionData({
        name: '',
        description: '',
        applicableOn: 'admin',
        permissions: {
          create: false,
          view: false,
          update: false,
          delete: false,
          export: false,
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
        {/* <div>
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={permissionData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={permissionData.description}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows={3}
          />
        </div> */}

        <div>
          <label htmlFor="applicableOn" className="block text-gray-700">Applicable On</label>
          <select
            id="applicableOn"
            name="applicableOn"
            value={permissionData.applicableOn}
            onChange={handleSelectChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          >
            <option value="admin">Admin Users</option>
            <option value="user">Non Admin Users</option>
          </select>
        </div>

        {!permissionsLoading && permissionsData && permission && (
          <div className="space-y-2">
            <label className="block text-gray-700">Assign Permissions</label>
            {permission.map((perm) => (
              <div key={perm.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={perm.name}
                  name={perm.name}
                  // checked={permissionData.permission[perm.name] || false}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor={perm.name}>{perm.name}</label>
              </div>
            ))}
          </div>
        )}



        <div className="text-center mt-4">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
          >
            Save Permission Template
          </button>
          <Link className="text-indigo-500 hover:text-indigo-600 text-center block mt-5" to="/settings"> Back to settings  </Link>
        </div>
      </form>

      {apiError && <p className="text-red-500 text-center mt-4">{apiError}</p>}
    </div>
  );
};

export default SuperAdminPermission;
