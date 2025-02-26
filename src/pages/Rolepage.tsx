import { useDeleteRoleById } from '@/hooks/useDeleteRoleById'
import { useFetchRoles } from '@/hooks/useFetchRoles'
import { useUpdateRoleById } from '@/hooks/useUpdateRoleById'
import { roleType } from '@/types/roleTypes'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCreateRole } from '../hooks/useCreateRole'

const RolePage: React.FC = () => {
  const [roleName, setRoleName] = useState<string>('')
  const [roleId, setRoleId] = useState<number | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [success, setSuccess] = useState<string>('')

  const {
    mutate,
    isPending,
    isError,
    error: createError,
    data,
  } = useCreateRole()
  const { rolesLoading, rolesData, isRolesError, rolesError, refetch } =
    useFetchRoles()
  const { roles } = rolesData || {}

  const {
    mutate: updateRole,
    updateRolePending,
    isRoleUpdateError,
    updateRoleError,
    updateRoleSuccess,
  } = useUpdateRoleById()
  const { deleteRole, deleteRolePending } = useDeleteRoleById()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleName(e.target.value)
  }

  const handleRoleSelect = (id: number) => {
    setRoleId(id)
    const selectedRole = roles?.find(role => role.id === id)
    if (selectedRole) {
      setRoleName(selectedRole.name)
    }
  }

  const roleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (roleName.trim()) {
      if (roleId) {
        updateRole(
          { id: roleId, name: roleName },
          {
            onSuccess: () => {
              refetch()
              setSuccess('')
              setIsEditing(false)
              setRoleId(null)
              setRoleName('')
            },
            onError: error => {
              console.log('Error updating permission:', error)
            },
          }
        )
      } else {
        mutate(
          { name: roleName },
          {
            onSuccess: () => {
              refetch()
              setSuccess(data?.message || 'Role created successfully!')
              setRoleName('')
            },
            onError: error => {
              console.log('Error creating role:', error)
            },
          }
        )
      }
    } else {
      console.log('Role name cannot be empty.')
    }
  }

  const handleDeleteRole = (id: number) => {
    deleteRole(id, {
      onSuccess: () => {
        refetch()
      },
    })
  }

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md ">
      <h2 className="text-2xl font-semibold text-center mb-6">Manage Roles</h2>

      <form onSubmit={roleSubmit} className="space-y-4">
        <div>
          <label htmlFor="roleName" className="block ">
            Role Name
          </label>
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

        {isRoleUpdateError && updateRoleError && (
          <div className="text-red-600 text-center mt-2">
            {updateRoleError.message}
          </div>
        )}

        <div className="text-center mt-4">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
            disabled={isPending || updateRolePending}
          >
            {isPending || updateRolePending
              ? isEditing
                ? 'Updating Role...'
                : 'Creating Role...'
              : isEditing
                ? 'Update Role'
                : 'Create Role'}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-center mb-4">
          Existing Roles
        </h3>

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

      {isError && createError && (
        <div className="text-red-600 text-center mt-2">
          {createError.message}
        </div>
      )}

      {updateRoleSuccess && (
        <div className="text-green-600 text-center mt-2">
          Role updated successfully!
        </div>
      )}

      {success && (
        <div className="text-green-600 text-center mt-2">{success}</div>
      )}
    </div>
  )
}

export default RolePage
