import { RoleModulePermission } from '@/types/roleModulePermissionType'
import axios, { AxiosResponse } from 'axios'

export const RoleModulePermissionCreate = async (
  data: RoleModulePermission
): Promise<RoleModulePermission> => {
  try {
    const res: AxiosResponse<RoleModulePermission> = await axios.post(
      'http://localhost:3000/api/role-module-permissions',
      data
    )
    if (res.status !== 200) {
      throw new Error('Error fetching API: ' + res.status)
    }
    return res.data
  } catch (error) {
    console.error('Error creating role module permissions:', error)
    throw new Error('Failed to create role module permissions')
  }
}
