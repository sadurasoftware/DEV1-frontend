import { useDeleteDepartmentById } from '@/hooks/useDeleteDepartmentById'
import { useFetchDepartments } from '@/hooks/useFetchDepartments'
import { useUpdateDepartmentById } from '@/hooks/useUpdateDepartmentById'
import { departmentType } from '@/types/departmentTypes'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCreateDepartment } from '../hooks/useCreateDepartment'
import { settingsValidation } from '@/validation/settingsInputValidation'
import axios from 'axios'
import { z } from 'zod'
import { QueryClient, useQueryClient } from '@tanstack/react-query'

const Departments: React.FC = () => {
  const [departmentName, setDepartmentName] = useState<string>('')
  const [departmentId, setDepartmentId] = useState<number | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [success, setSuccess] = useState<string>('')
  const [errMsg, setErrMsg] = useState('')

  const queryClient = useQueryClient()

  const {
    mutate,
    isPending,
  } = useCreateDepartment()
  const {
    departmentsLoading,
    departmentsData,
    isDepartmentsError,
    departmentsError,
    refetch,
  } = useFetchDepartments()
  const { departments } = departmentsData || {}

  const {
    mutate: updateDepartment,
    updateDepartmentPending,
  } = useUpdateDepartmentById()
  const { deleteDepartment, deleteDepartmentPending } =
    useDeleteDepartmentById()

  if (isDepartmentsError) {
    setErrMsg(departmentsError?.message || 'Error fetching departments')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartmentName(e.target.value)
    setSuccess('')
    setErrMsg('')
  }

  const handleDepartmentSelect = (id: number) => {
    setDepartmentId(id)
    const selectedDepartment = departments?.find(dept => dept.id === id)
    if (selectedDepartment) {
      setDepartmentName(selectedDepartment.name)
      setIsEditing(true)
    }
  }

  const departmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      settingsValidation.parse({ name: departmentName })
      if (departmentId) {
        updateDepartment(
          { id: departmentId, name: departmentName },
          {
            onSuccess: (data: any) => {
              refetch()
              setSuccess(data?.message || 'Department updated successfully!')
              queryClient.invalidateQueries({ queryKey: ['departments'] })
              setIsEditing(false)
              setDepartmentId(null)
              setDepartmentName('')
            },
            onError: (error: any) => {
              if (axios.isAxiosError(error)) {
                setSuccess('')
                setErrMsg(error.response?.data.message)
              } else {
                setSuccess('')
                setErrMsg(error.message || 'Something went wrong. Please try again.')
              }
            },
          }
        )
      } else {
        mutate(
          { name: departmentName },
          {
            onSuccess: (data: any) => {
              refetch()
              setSuccess(data?.message || 'Department created successfully!')
              queryClient.invalidateQueries({ queryKey: ['departments'] })
              setIsEditing(false)
              setDepartmentName('')
            },
            onError: (error: any) => {
              if (axios.isAxiosError(error)) {
                setSuccess('')
                setErrMsg(error.response?.data.message)
              } else {
                setSuccess('')
                setErrMsg(error.message || 'Something went wrong. Please try again.')
              }
            },
          }
        )
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setErrMsg('Department ' + error.errors[0]?.message || 'Invalid input')
        setSuccess('')
      }
    }
  }

  const handleDeleteDepartment = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this department?')
    if (!confirmDelete) return
    deleteDepartment(id, {
      onSuccess: (data:any) => {
        setSuccess(data?.message)
        setErrMsg('')
        setDepartmentId(null)
        
      },
      onError: (error: any) => {
        setSuccess('')
        setErrMsg(error.response.data.message || error.response.data.errors || 'Something went wrong. Please try again.')
      },
    })
  }

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Manage Departments
      </h2>

      <form onSubmit={departmentSubmit} className="space-y-4">
        <div>
          <label htmlFor="departmentName" className="block">
            Department Name
          </label>
          <input
            type="text"
            id="departmentName"
            name="departmentName"
            value={departmentName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        <div className="text-center mt-4">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
            disabled={isPending || updateDepartmentPending}
          >
            {isPending || updateDepartmentPending
              ? isEditing
                ? 'Updating Department...'
                : 'Creating Department...'
              : isEditing
                ? 'Update Department'
                : 'Create Department'}
          </button>
        </div>
      </form>

          {success && (
        <div className="text-green-600 text-center mt-2">{success}</div>
      )}

          {errMsg && (
        <div className="text-red-600 text-center mt-2">{errMsg}</div>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-center mb-4">
          Existing Departments
        </h3>

        {departmentsLoading ? (
          <div className="text-center">Loading Departments...</div>
        ) : isDepartmentsError && departmentsError ? (
          <div className="text-red-600 text-center">
            {departmentsError.message}
          </div>
        ) : (
          <div className="text-center">
            <table className="w-full">
              <tbody>
                {departments?.map((dept: departmentType) => (
                  <tr key={dept.id}>
                    <td>{dept.name}</td>
                    <td>
                      <button
                        className="bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-600 p-2"
                        onClick={() => handleDepartmentSelect(dept.id)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 p-2"
                        onClick={() => handleDeleteDepartment(dept.id)}
                        disabled={deleteDepartmentPending}
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

export default Departments
