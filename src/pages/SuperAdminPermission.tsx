import React, { useState, useEffect } from 'react'
import { useFetchModules } from '@/hooks/useFetchModules'
import { useFetchPermissions } from '@/hooks/useFetchPermissions'
import { useFetchRoles } from '@/hooks/useFetchRoles'
import { useRoleModulePermissionCreate } from '@/hooks/useRoleModulePermissionCreate'
import { useFetchRoleModulePermission } from '@/hooks/useFetchRoleModulePermission'
import { Link } from 'react-router-dom'

const SuperAdminPermission: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<number | null>(null) 
  const [permissionData, setPermissionData] = useState<PermissionsData>({})

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [apiError, setApiError] = useState<string | null>(null)

  const { rolesLoading, rolesData } = useFetchRoles()
  const { roles } = rolesData || {}
  const rolesFilter = roles?.filter(role => role.name !== 'superadmin')
  
  const { modulesLoading, modulesData } = useFetchModules()
  const module = modulesData?.module || []

  const { mutate } = useRoleModulePermissionCreate()

  const { permissionsLoading, permissionsData } = useFetchPermissions()
  const permissions = permissionsData?.permission || []

  const roleId = selectedRole ?? null

  const { modulePermissionLoading, modulePermissionData, isModulePermissionError, modulePermissionError, refetch } = useFetchRoleModulePermission(roleId)

  useEffect(() => {
    if (modulePermissionData) {
      const initialPermissionData: PermissionsData = {}

      modulePermissionData.roleModules.forEach((module) => {
        initialPermissionData[module.moduleId] = {}

        module.Permissions.forEach((permissionId) => {
          initialPermissionData[module.moduleId][permissionId] = true
        })
      })

      setPermissionData(initialPermissionData)
    }
  }, [modulePermissionData])

  const handleCheckboxChange = (moduleId: number, permissionId: number, checked: boolean) => {
    setPermissionData((prevState) => ({
      ...prevState,
      [moduleId]: {
        ...prevState[moduleId],
        [permissionId]: checked,
      },
    }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(Number(e.target.value)) 
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})
    setApiError(null)

    if (selectedRole === null) {
      setFormErrors({ role: 'Role is required' })
      return
    }

    const payload = {
      roleId: selectedRole,
      modulePermissions: Object.keys(permissionData).map((moduleId: string) => {
        const moduleIdNum = Number(moduleId) 
        const permissionsForModule = Object.keys(permissionData[moduleIdNum])
          .filter((permissionId: string) => permissionData[moduleIdNum][Number(permissionId)])
          .map((permissionId: string) => ({
            permissionId: Number(permissionId),
          }))

        return {
          moduleId: moduleIdNum,
          permissions: permissionsForModule,
        }
      }),
    }

    try {
      console.log('Submitting data: ', payload)
      mutate(payload)
      setSelectedRole(null)
      setPermissionData({})
    } catch (err) {
      setApiError(`Failed to save permission template ${err}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create Permission Template
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleSelectChange}
              value={selectedRole ?? ''}
            >
              {!rolesLoading ? (
                rolesFilter?.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Loading roles...
                </option>
              )}
            </select>
            {formErrors.role && (
              <p className="text-red-500 text-sm">{formErrors.role}</p>
            )}
          </div>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">
                  Modules
                </th>
                {!permissionsLoading &&
                  permissions.map((perm) => (
                    <th
                      key={perm.id}
                      className="px-4 py-2 text-center font-semibold text-gray-700 border-b"
                    >
                      {perm.name}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {!modulesLoading &&
                module.map((mod) => (
                  <tr key={mod.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 text-left text-gray-800">
                      {mod.name}
                    </td>

                    {!permissionsLoading &&
                      permissions.map((perm) => (
                        <td
                          key={`${mod.id}-${perm.id}`}
                          className="text-center py-2"
                        >
                          <input
                            type="checkbox"
                            id={`${mod.id}-${perm.id}`}
                            name={`${mod.id}-${perm.id}`}
                            className="form-checkbox h-5 w-5 text-blue-500"
                            checked={permissionData[mod.id]?.[perm.id] || false} 
                            onChange={(e) =>
                              handleCheckboxChange(mod.id, perm.id, e.target.checked)
                            }
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
        </div>
      </form>
      <div className="text-center mt-4">
        <Link to="/settings" className="text-blue-500 hover:text-blue-700">
          Back to Settings
        </Link>
      </div>
      {apiError && <p className="text-red-500 text-center mt-4">{apiError}</p>}
    </div>
  )
}

export default SuperAdminPermission
