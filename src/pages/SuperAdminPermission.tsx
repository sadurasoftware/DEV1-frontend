import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PermissionTemplateAdmin } from '../types/permissionTemplate';
import { useFetchPermissions } from '@/hooks/useFetchPermissions';
import { useFetchModules } from '@/hooks/useFetchModules';
import { useFetchRoles } from '@/hooks/useFetchRoles';
import { roleType } from '@/types/roleTypes';
import { permissionType } from '@/types/permissionsTypes';

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

  const { rolesLoading, rolesData, isRolesError, rolesError } = useFetchRoles();
  const { roles } = rolesData || {};

  const { modulesLoading, modulesData, isModulesError, modulesError, refetch } = useFetchModules();
  const { module } = modulesData || {};

  const { permissionsLoading, permissionsData } = useFetchPermissions();
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
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Permission Template</h2>

      <form onSubmit={handleSubmit} className="space-y-6">


        <div className="space-y-4">

          <div>
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              {!rolesLoading ? (
                roles?.map((role: roleType, index: number) => (
                  <option key={index} value={role.name}>
                    {role.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>Loading roles...</option>
              )}
            </select>
            {formErrors.role && <p className="text-red-500 text-sm">{formErrors.role}</p>}
          </div>
        </div>


        

        <div className="overflow-x-auto p-4">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">Modules</th>
                {!permissionsLoading && permissionsData && permission && permission.map((perm) => (
                  <th key={perm.id} className="px-4 py-2 text-center font-semibold text-gray-700 border-b">
                    {perm.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>

              {!modulesLoading && modulesData && module && module.map((mod) => (
                <tr key={mod.id} className="border-b hover:bg-gray-50">

                  <td className="px-4 py-2 text-left text-gray-800">{mod.name}</td>


                  {!permissionsLoading && permissionsData && permission && permission.map((perm) => (
                    <td key={`${mod.id}-${perm.id}`} className="text-center py-2">
                      <input
                        type="checkbox"
                        id={`${mod.id}-${perm.id}`}
                        name={`${mod.id}-${perm.id}`}
                        className="form-checkbox h-5 w-5 text-blue-500"
                      // checked={mod.permissions && mod.permissions[perm.name]} 
                      // onChange={() => handleCheckboxChange(mod.id, perm.id)} 
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>



        <div className="text-center mt-6">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
          >
            Save Permission Template
          </button>
          <Link className="text-indigo-500 hover:text-indigo-600 text-center block mt-5" to="/settings">Back to settings</Link>
        </div>
      </form>

      {apiError && <p className="text-red-500 text-center mt-4">{apiError}</p>}
    </div>
  );
};

export default SuperAdminPermission;
