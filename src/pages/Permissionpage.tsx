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
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [success, setSuccess] = useState<string>('')

  const {
    mutate,
    isPending,
    isError,
    error: createError,
    data,
  } = useCreatePermission()
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
      setIsEditing(true)
    }
  }

  const permissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (permissionName.trim()) {
      if (permissionId) {
        updatePermission(
          { id: permissionId, name: permissionName },
          {
            onSuccess: () => {
              refetch()
              setSuccess('')
              setIsEditing(false)
              setPermissionId(null)
              setPermissionName('')
            },
            onError: error => {
              console.log('Error updating permission:', error)
            },
          }
        )
      } else {
        mutate(
          { name: permissionName },
          {
            onSuccess: () => {
              refetch()
              setSuccess(data?.message || 'Permission created successfully!')
              setPermissionName('')
            },
            onError: error => {
              console.log('Error creating permisson:', error)
            },
          }
        )
      }
    } else {
      console.log('Permission name cannot be empty.')
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
              ? isEditing
                ? 'Updating Permission...'
                : 'Creating Permission...'
              : isEditing
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

      {isError && createError && (
        <div className="text-red-600 text-center mt-2">
          {createError.message}
        </div>
      )}

      {updatePermissionSuccess && (
        <div className="text-green-600 text-center mt-2">
          Permission updated successfully!
        </div>
      )}

      {success && (
        <div className="text-green-600 text-center mt-2">{success}</div>
      )}
    </div>
  )
}

export default Permissionpage
