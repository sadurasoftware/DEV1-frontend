import { useDeletePermissionById } from '@/hooks/useDeletePermissionById'
import { useFetchPermissions } from '@/hooks/useFetchPermissions'
import { useUpdatePermissionById } from '@/hooks/useUpdatePermissionById'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCreatePermission } from '../hooks/useCreatePermission'
import { settingsValidation } from '@/validation/settingsInputValidation'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'

const Permissionpage: React.FC = () => {
  const [permissionName, setPermissionName] = useState<string>('')
  const [permissionId, setPermissionId] = useState<number | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [success, setSuccess] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState('')

  const queryClient = useQueryClient()

  const { mutate, isPending } = useCreatePermission()
  const {
    permissionsLoading,
    permissionsData,
    isPermissionsError,
    permissionsError,
    refetch,
  } = useFetchPermissions()

  const permissions = permissionsData?.permission || []

  const { mutate: updatePermission, updatePermissionPending } = useUpdatePermissionById()
  const { deletePermission, deletePermissionPending } = useDeletePermissionById()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPermissionName(e.target.value)
    setErrorMsg('')
    setSuccess('')
  }

  const handlePermissionSelect = (id: number) => {
    setPermissionId(id)
    const selectedPermission = permissions.find(perm => perm.id === id)
    if (selectedPermission) {
      setPermissionName(selectedPermission.name)
      setIsEditing(true)
    }
  }

  const permissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      settingsValidation.parse({ name: permissionName })

      if (permissionId) {
        updatePermission(
          { id: permissionId, name: permissionName },
          {
            onSuccess: (res: any) => {
              refetch()
              setSuccess(res?.message || 'Permission updated successfully!')
              setIsEditing(false)
              setPermissionId(null)
              setPermissionName('')
              setErrorMsg('')
              queryClient.invalidateQueries({ queryKey: ['permissions'] })
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
            onSuccess: (res: any) => {
              queryClient.invalidateQueries({ queryKey: ['permissions'] })
              setSuccess(res?.message || 'Permission created successfully!')
              setPermissionName('')
              setPermissionId(null)
              setErrorMsg('')
              setIsEditing(false)
            },
            onError: (error: any) => {
              if (axios.isAxiosError(error)) {
                setSuccess('')
                setErrorMsg(
                  error?.response?.data?.message ||
                    error?.response?.data?.errors ||
                    'Error creating Permission'
                )
              }
            },
          }
        )
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setSuccess('')
        setErrorMsg('Permission ' + (error.errors[0]?.message || 'Invalid input'))
      }
    }
  }

  const handleDeletePermission = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this permission?')
    if (!confirmDelete) return
    deletePermission(id, {
      onSuccess: (res:any) => {
        setSuccess(res?.message || 'Permission created')
        queryClient.invalidateQueries({ queryKey: ['permissions'] })
        setErrorMsg('')
        setIsEditing(false)
        setPermissionId(null)
        setPermissionName('')
      },
    })
  }

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md ">
      <h2 className="text-2xl font-semibold text-center mb-6">Manage Permission</h2>

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
          />
        </div>

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

      {errorMsg && <div className="text-red-600 text-center mt-2">{errorMsg}</div>}
      {success && <div className="text-green-600 text-center mt-2">{success}</div>}

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-center mb-4">Existing Permissions</h3>

        {permissionsLoading ? (
          <div className="text-center">Loading permissions...</div>
        ) : isPermissionsError && permissionsError ? (
          <div className="text-red-600 text-center">{permissionsError.message}</div>
        ) : (
          <div className="text-center">
            <table className="w-full">
              <tbody>
                {permissions.map((perm: any) => (
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
