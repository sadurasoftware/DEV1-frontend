import React, { useState } from 'react';
import { useCreateRole } from '../hooks/useCreateRole';
import { Link } from 'react-router-dom';
import { useFetchRoles } from '@/hooks/useFetchRoles';
import { roleType } from '@/types/roleTypes';
import { useUpdateRoleById } from '@/hooks/useUpdateRoleById';
import { useDeleteRoleById } from '@/hooks/useDeleteRoleById';

const RolePage: React.FC = () => {
  const [roleName, setRoleName] = useState<string>('');
  const [roleId, setRoleId] = useState<number | null>(null);

  const [sucess, setSuccess] = useState<string>('');
  const [errror, setError] = useState<string>('');

  const { mutate, isPending, isError, isSuccess, error, data } = useCreateRole();
  const { rolesLoading, rolesData, isRolesError, rolesError, refetch } = useFetchRoles();
  const { roles } = rolesData || {};

  const { mutate: updateRole, updateRolePending, isRoleUpdateError, updateRoleError, updateRoleSuccess } = useUpdateRoleById();
  const { deleteRole, deleteRolePending } = useDeleteRoleById();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleName(e.target.value);
  };


  const handleRoleSelect = (id: number) => {
    setRoleId(id);
    const selectedRole = roles?.find(role => role.id === id);
    if (selectedRole) {
      setRoleName(selectedRole.name);
    }
  };


  const roleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (roleName.trim()) {
        if (roleId) {

          console.log(roleId, roleName)
          updateRole({ id: roleId, name: roleName }, {
            onSuccess: () => {
              refetch();
              
            },
          });
        } else {

          mutate({ name: roleName }, {
            onSuccess: () => {
              refetch();
              setSuccess(data?.message || '');
            },
          });
        }
      }
    } catch (err) {
      console.error("Error during role submission:", err);
    }
  };


  const handleDeleteRole = (id: number) => {
    deleteRole(id, {
      onSuccess: () => {
        refetch();
      },
    });
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

        {updateRoleSuccess && (
          <div className="text-green-600 text-center mt-2">Role updated successfully!</div>
        )}

        {isRoleUpdateError && updateRoleError && (
          <div className="text-red-600 text-center mt-2">{updateRoleError.message}</div>
        )}

        <div className="text-center mt-4">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
            disabled={isPending || updateRolePending}
          >
            {isPending || updateRolePending ? (roleId ? 'Updating Role...' : 'Creating Role...') : (roleId ? 'Update Role' : 'Create Role')}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-center mb-4">Existing Roles</h3>

        {rolesLoading ? (
          <div className="text-center">Loading roles...</div>
        ) : isRolesError && rolesError ? (
          <div className="text-red-600 text-center">{rolesError.message}</div>
        ) : (
          <div className="text-center">
            <table className="w-full">
              <tbody>
                {roles?.map((role: roleType) => (
                  <tr key={role.id}>
                    <td>{role.name}</td>
                    <td>
                      <button
                        className="bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-600 p-2"
                        onClick={() => handleRoleSelect(role.id)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 p-2"
                        onClick={() => handleDeleteRole(role.id)}
                        disabled={deleteRolePending}
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

      <div className="text-center mt-4">
        <Link to="/settings" className="text-blue-500 hover:text-blue-700">
          Back to Settings
        </Link>
      </div>
    </div>
  );
};

export default RolePage;
