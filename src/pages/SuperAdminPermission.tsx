import { useFetchModules } from '@/hooks/useFetchModules'
import { useFetchPermissions } from '@/hooks/useFetchPermissions'
import { useFetchRoleModulePermission } from '@/hooks/useFetchRoleModulePermission'
import { useFetchRoles } from '@/hooks/useFetchRoles'
import { useRoleModulePermissionCreate } from '@/hooks/useRoleModulePermissionCreateHook'
import {
  PermissionsData,
  createModulePermissionType,
  successResponse,
} from '@/types/roleModulePermissionType'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SuperAdminPermission: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<number | null>(2)
  const [permissionData, setPermissionData] = useState<PermissionsData>({})
  const [success, setSuccess] = useState<successResponse>()
  // const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [apiError, setApiError] = useState<string | null>(null)

  const { rolesLoading, rolesData } = useFetchRoles()
  const { roles } = rolesData || {}
  const rolesFilter = roles?.filter(role => role.name !== 'superadmin')

  const { modulesLoading, modulesData } = useFetchModules()
  const module = modulesData?.module || []

  const { mutate, isSuccess, data } = useRoleModulePermissionCreate()

  const { permissionsLoading, permissionsData } = useFetchPermissions()
  const permissions = permissionsData?.permission || []

  const roleId = selectedRole ?? null

  const { modulePermissionData } = useFetchRoleModulePermission(roleId || 2)

  useEffect(() => {
    if (modulePermissionData) {
      const initialPermissionData: PermissionsData = {}
      if (modulePermissionData.roleModules.length === 0) {
        setPermissionData({})
      } else {
        modulePermissionData.roleModules.forEach(module => {
          initialPermissionData[module.moduleId] = {}

          module.permissions.forEach(permission => {
            initialPermissionData[module.moduleId][permission.permissionId] =
              permission.status
          })
        })

        setPermissionData(initialPermissionData)
      }
    }
  }, [modulePermissionData])

  const handleCheckboxChange = (
    moduleId: number,
    permissionId: number,
    checked: boolean
  ) => {
    setPermissionData(prevState => ({
      ...prevState,
      [moduleId]: {
        ...prevState[moduleId],
        [permissionId]: checked,
      },
    }))

    const payload: createModulePermissionType = {
      roleId: selectedRole!,
      moduleId: moduleId,
      permissionId: permissionId,
      status: checked,
    }

    try {
      mutate(payload)
      if (isSuccess) {
        setSuccess(data?.message)
      }
    } catch (err) {
      setApiError(`Failed to save permission`)
    }
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(Number(e.target.value))
  }

  const handleSelectAllPermissions = (moduleId: number, checked: boolean) => {
    const updatedPermissions = { ...permissionData }

    permissions.forEach(perm => {
      if (!updatedPermissions[moduleId]) updatedPermissions[moduleId] = {}
      updatedPermissions[moduleId][perm.id] = checked
    })

    setPermissionData(updatedPermissions)
  }

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setFormErrors({})
  //   setApiError(null)

  //   if (selectedRole === null) {
  //     setFormErrors({ role: 'Role is required' })
  //     return
  //   }

  //   const payload = {
  //     roleId: selectedRole,
  //     roleModules: Object.keys(permissionData).map((moduleId: string) => {
  //       const moduleIdNum = Number(moduleId)
  //       const permissionsForModule = Object.keys(permissionData[moduleIdNum])
  //         .filter(
  //           (permissionId: string) =>
  //             permissionData[moduleIdNum][Number(permissionId)]
  //         )
  //         .map((permissionId: string) => ({
  //           permissionId: Number(permissionId),
  //         }))

  //       return {
  //         moduleId: moduleIdNum,
  //         Permissions: permissionsForModule,
  //       }
  //     }),
  //   }

  //   console.log(payload)
  //   try {
  //     console.log('Submitting data: ', payload)
  //     mutate(payload)
  //     setSelectedRole(null)
  //     setPermissionData({})
  //   } catch (err) {
  //     setApiError(`Failed to save permission template ${err}`)
  //   }
  // }

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-md ">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Create Permission Template
      </h2>

      <form className="space-y-6">
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
                rolesFilter?.map(role => (
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
            {/* {formErrors.role && (
              <p className="text-red-500 text-sm">{formErrors.role}</p>
            )} */}
          </div>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="min-w-full table-auto border-collapse border ">
            <thead className="">
              <tr>
                <th className="px-4 py-2 text-left font-semibold border-b">
                  Modules
                </th>
                {!permissionsLoading &&
                  permissions.map(perm => (
                    <th
                      key={perm.id}
                      className="px-4 py-2 text-center font-semibold  border-b"
                    >
                      {perm.name}
                    </th>
                  ))}

                <th className="px-4 py-2 text-center font-semibold  border-b">
                  Select All
                </th>
              </tr>
            </thead>
            <tbody>
              {!modulesLoading &&
                module.map(mod => (
                  <tr key={mod.id} className="border-b">
                    <td className="px-4 py-2 text-left border-r">{mod.name}</td>

                    {!permissionsLoading &&
                      permissions.map(perm => (
                        <td
                          key={`${mod.id}-${perm.id}`}
                          className="text-center py-2 border-r"
                        >
                          <input
                            type="checkbox"
                            id={`${mod.id}-${perm.id}`}
                            name={`${mod.id}-${perm.id}`}
                            className="form-checkbox h-5 w-5 text-blue-500"
                            checked={permissionData[mod.id]?.[perm.id] || false}
                            onChange={e =>
                              handleCheckboxChange(
                                mod.id,
                                perm.id,
                                e.target.checked
                              )
                            }
                          />
                        </td>
                      ))}

                    <td className="text-center py-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-500"
                        onChange={e =>
                          handleSelectAllPermissions(mod.id, e.target.checked)
                        }
                        checked={permissions.every(
                          perm => permissionData[mod.id]?.[perm.id]
                        )}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-6">
          {/* <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600"
          >
            Save Permission Template
          </button> */}
          {/* <Button
            type="submit"
            className="w-full mt-6 py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
          >
            Save Permission Template
          </Button> */}
        </div>
      </form>
      <div className="text-center mt-4">
        <Link to="/settings" className="text-blue-500 hover:text-blue-700">
          Back to Settings
        </Link>
      </div>
      {success && <p className="text-green-500 text-center mt-4">{success}</p>}
      {apiError && <p className="text-red-500 text-center mt-4">{apiError}</p>}
    </div>
  )
}

export default SuperAdminPermission
