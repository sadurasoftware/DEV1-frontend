import { useDeleteModuleById } from '@/hooks/useDeleteModuleById'
import { useFetchModules } from '@/hooks/useFetchModules'
import { useUpdateModuleById } from '@/hooks/useUpdateModuleById'
import { moduleType } from '@/types/moduleTypes'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCreateModule } from '../hooks/useCreateModule'
import axios from 'axios'

import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'
import { settingsValidation } from '@/validation/settingsInputValidation'

const Modules: React.FC = () => {
  const [moduleName, setModuleName] = useState<string>('')
  const [moduleId, setModuleId] = useState<number | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [success, setSuccess] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState('')

  const queryClient = useQueryClient()

  const {
    mutate,
    isPending,
  } = useCreateModule()
  const { modulesLoading, modulesData, isModulesError, modulesError, refetch } =
    useFetchModules()
  const { module } = modulesData || {}

  const {
    mutate: updateModule,
    updateModulePending,
  } = useUpdateModuleById()
  const { deleteModule, deleteModulePending } = useDeleteModuleById()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModuleName(e.target.value)
    setErrorMsg('')
    setSuccess('')
  }

  const handleModuleSelect = (id: number) => {
    setModuleId(id)
    const selectedModule = module?.find(mod => mod.id === id)
    if (selectedModule) {
      setModuleName(selectedModule.name)
      setIsEditing(true)
    }
  }

  const moduleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      settingsValidation.parse({ name: moduleName })
      if (moduleId) {
        updateModule(
          { id: moduleId, name: moduleName },
          {
            onSuccess: (res: any) => {
              refetch()
              setSuccess(res?.message)
              queryClient.invalidateQueries({
                queryKey: ['modules'],
              })
              setIsEditing(false)
              setModuleId(null)
              setModuleName('')
            },
            onError: error => {
              console.log('Error updating module:', error)
            },
          }
        )
      } else {
        mutate(
          { name: moduleName },
          {
            onSuccess: (res: any) => {
              setSuccess(res?.message || 'Module created successfully!')
              queryClient.invalidateQueries({
                queryKey: ['modules'],
              })
              setModuleName('')
              setModuleId(null)
              setErrorMsg('')
              setIsEditing(false)
            },
            onError: (error: any) => {
              if (axios.isAxiosError(error)) {
                setErrorMsg(error?.response?.data?.message || error?.response?.data?.errors || 'Error creating module.')
                setSuccess('')
                setIsEditing(false)
              }
            },
          }
        )
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        setErrorMsg('Module '+ error.errors[0]?.message || 'Invalid input')
        setSuccess('')
      }
    }
  }

  const handleDeleteModule = (id: number) => {
    const confirmDel = window.confirm('Are you sure you want to delete this module?')
    if (!confirmDel) return
    deleteModule(id, {
      onSuccess: (res: any) => {
        setSuccess(res?.message)
        queryClient.invalidateQueries({
          queryKey: ['modules'],
        })
        setErrorMsg('')
      },
      onError: (error: any) => {
        if (axios.isAxiosError(error)) {
          setSuccess('')
          setErrorMsg(error?.response?.data?.message || error?.response?.data?.errors || 'Error deleting module.')
        }
      }
    })
  }

  return (
    <div className="max-w-lg mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Manage Modules
      </h2>

      <form onSubmit={moduleSubmit} className="space-y-4">
        <div>
          <label htmlFor="moduleName" className="block">
            Module Name
          </label>
          <input
            type="text"
            id="moduleName"
            name="moduleName"
            value={moduleName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>



        <div className="text-center mt-4">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
            disabled={isPending || updateModulePending}
          >
            {isPending || updateModulePending
              ? isEditing
                ? 'Updating Module...'
                : 'Creating Module...'
              : isEditing
                ? 'Update Module'
                : 'Create Module'}
          </button>
        </div>
      </form>

      <div>
        {success && (
          <div className="text-green-600 text-center mt-2">{success}</div>
        )}

        {errorMsg && (
          <div className="text-red-600 text-center mt-2">{errorMsg}</div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-center mb-4">
          Existing Modules
        </h3>

        {modulesLoading ? (
          <div className="text-center">Loading Modules...</div>
        ) : isModulesError && modulesError ? (
          <div className="text-red-600 text-center">{modulesError.message}</div>
        ) : (
          <div className="text-center">
            <table className="w-full">
              <tbody>
                {module?.map((mod: moduleType) => (
                  <tr key={mod.id}>
                    <td>{mod.name}</td>
                    <td>
                      <button
                        className="bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-600 p-2"
                        onClick={() => handleModuleSelect(mod.id)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 p-2"
                        onClick={() => handleDeleteModule(mod.id)}
                        disabled={deleteModulePending}
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

export default Modules
