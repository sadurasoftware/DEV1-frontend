import { useDeletePermissionById } from '@/hooks/useDeletePermissionById'
import { useFetchPermissions } from '@/hooks/useFetchPermissions'
import { useUpdatePermissionById } from '@/hooks/useUpdatePermissionById'
import { permissionType } from '@/types/permissionsTypes'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCreatePermission } from '../hooks/useCreatePermission'

const Permissionpage: React.FC = () => {
  const [permissionName, setPermissionName] = useState<string>('')
  const [permissionId, setPermissionId] = useState<number | null>(null)

  const { mutate, isPending, isError, isSuccess, error, data } =
    useCreatePermission()
  const {
    permissionsLoading,
    permissionsData,
    isPermissionsError,
    permissionsError,
    refetch,
  } = useFetchPermissions()
  const { permission } = permissionsData || {}

  const {
    mutate: updatePermission,
    updatePermissionPending,
    isPermissionUpdateError,
    updatePermissionError,
    updatePermissionSuccess,
  } = useUpdatePermissionById()
  const { deletePermission, deletePermissionPending } =
    useDeletePermissionById()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPermissionName(e.target.value)
  }

  const handlePermissionSelect = (id: number) => {
    setPermissionId(id)
    const selectedPermission = permission?.find(perm => perm.id === id)
    if (selectedPermission) {
      setPermissionName(selectedPermission.name)
    }
  }

  const permissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (permissionName.trim()) {
        if (permissionId) {
          console.log(permissionId, permissionName)
          updatePermission(
            { id: permissionId, name: permissionName },
            {
              onSuccess: () => {
                refetch()
              },
            }
          )
        } else {
          mutate(
            { name: permissionName },
            {
              onSuccess: () => {
                refetch()
              },
            }
          )
        }
      }
    } catch (err) {
      console.error('Error during permission submission:', err)
    }
  }

  const handleDeletePermission = (id: number) => {
    deletePermission(id, {
      onSuccess: () => {
        refetch()
      },
    })
  }

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md ">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Manage Permission
      </h2>

      <form onSubmit={permissionSubmit} className="space-y-4">
        <div>
          <label htmlFor="permissionName" className="block ">
            Permission Name
          </label>
          <input
            type="text"
            id="permissionName"
            name="permissionName"
            value={permissionName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {isError && error && (
          <div className="text-red-600 text-center mt-2">{error.message}</div>
        )}

        {isSuccess && data && (
          <div className="text-green-600 text-center mt-2">
            Permission created successfully!
          </div>
        )}

        {updatePermissionSuccess && (
          <div className="text-green-600 text-center mt-2">
            Permission updated successfully!
          </div>
        )}

        {isPermissionUpdateError && updatePermissionError && (
          <div className="text-red-600 text-center mt-2">
            {updatePermissionError.message}
          </div>
        )}

        <div className="text-center mt-4">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
            disabled={isPending || updatePermissionPending}
          >
            {isPending || updatePermissionPending
              ? permissionId
                ? 'Updating Permission...'
                : 'Creating Permission...'
              : permissionId
                ? 'Update Permission'
                : 'Create Permission'}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-center mb-4">
          Existing Permissions
        </h3>

        {permissionsLoading ? (
          <div className="text-center">Loading permissions...</div>
        ) : isPermissionsError && permissionsError ? (
          <div className="text-red-600 text-center">
            {permissionsError.message}
          </div>
        ) : (
          <div className="text-center">
            <table className="w-full">
              <tbody>
                {permission?.map((perm: permissionType) => (
                  <tr key={perm.id}>
                    <td>{perm.name}</td>
                    <td>
                      <button
                        className="bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-600 p-2"
                        onClick={() => handlePermissionSelect(perm.id)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 p-2"
                        onClick={() => handleDeletePermission(perm.id)}
                        disabled={deletePermissionPending}
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
  )
}

export default Permissionpage
