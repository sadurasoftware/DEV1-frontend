import { useDeleteRoleById } from '@/hooks/useDeleteRoleById'
import { useFetchRoles } from '@/hooks/useFetchRoles'
import { useUpdateRoleById } from '@/hooks/useUpdateRoleById'
import { roleType } from '@/types/roleTypes'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCreateRole } from '../hooks/useCreateRole'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { settingsValidation } from '@/validation/settingsInputValidation'

const RolePage: React.FC = () => {
  const [roleName, setRoleName] = useState<string>('')
  const [roleId, setRoleId] = useState<number | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [success, setSuccess] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string>('')

  const queryClient = useQueryClient()

  const {
    mutate,
    isPending,
  } = useCreateRole()
  const { rolesLoading, rolesData, isRolesError, rolesError, refetch } =
    useFetchRoles()
  const { roles } = rolesData || {}

  const {
    mutate: updateRole,
    updateRolePending,
  } = useUpdateRoleById()
  const { deleteRole, deleteRolePending } = useDeleteRoleById()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleName(e.target.value)
    setErrorMsg('')
    setSuccess('')
  }

  const handleRoleSelect = (id: number) => {
    setRoleId(id)
    const selectedRole = roles?.find(role => role.id === id)
    if (selectedRole) {
      setRoleName(selectedRole.name)
      setIsEditing(true)
    }
  }

  const roleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      settingsValidation.parse({name: roleName })
      if (roleId) 
      {
        updateRole(
          { id: roleId, name: roleName },
          {
            onSuccess: (data: any) => {
              refetch()
              setSuccess(data?.message)
              queryClient.invalidateQueries({ queryKey: ['roles'] })
              setIsEditing(false)
              setRoleId(null)
              setRoleName('')
            },
            onError: (error: any) => {
              if (axios.isAxiosError(error)) {
                setSuccess('')
                setIsEditing(true)
                setErrorMsg(error?.response?.data?.message || error?.response?.data?.errors)
              } else {
                setSuccess('')
                setErrorMsg(error?.message || 'Something went wrong')
              }
            },
          }
        )
      } else {
        mutate(
          { name: roleName },
          {
            onSuccess: (data: any) => {
              refetch()
              setErrorMsg('')
              setSuccess(data?.message)
              queryClient.invalidateQueries({ queryKey: ['roles'] })
              setIsEditing(false)
              setRoleName('')
              setRoleId(null)
            },
            onError: (error: any) => {
              if (axios.isAxiosError(error)) {
                setSuccess('')
                setErrorMsg(error?.response?.data?.message || error?.response?.data?.errors)
              } else {
                setSuccess('')
                setErrorMsg(error?.message || 'Something went wrong')
              }
            },
          }
        )
      }
    } catch (error:any) 
    {
      if (error instanceof z.ZodError) {
        setSuccess('')
        setErrorMsg('')
            setErrorMsg('Role '+error.errors[0]?.message || 'Invalid input')
          }
    }
  }

  const handleDeleteRole = (id: number) => {
    const confirmDel = window.confirm('Are you sure you want to delete this role?')
    if (!confirmDel) return
    deleteRole(id, {
      onSuccess: (data: any) => {
        setErrorMsg('')
        setSuccess(data?.message)
        queryClient.invalidateQueries({ queryKey: ['roles'] })
        setIsEditing(false)
        setRoleId(null)
        setRoleName('')
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

          />
        </div>

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

      <div>
        {success && (
          <div className="text-green-600 text-center mt-2">
            {success}
          </div>
        )}
        {errorMsg && (
          <div className="text-red-600 text-center mt-2">
            {errorMsg}
          </div>
        )}
      </div>

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
    </div>
  )
}

export default RolePage
