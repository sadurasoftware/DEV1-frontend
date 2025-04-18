import { RoleModulePermission } from '@/types/roleModulePermissionType'
import { AxiosResponse } from 'axios'
import { useLoginInfoStore } from '../store/useLoginInfoStore'
import api from '@/lib/api'

export const RoleModulePermissionFetch = async (
  roleId: number
): Promise<RoleModulePermission> => {
  const token = useLoginInfoStore.getState().token
  try {
    const res: AxiosResponse<RoleModulePermission> = await api.get(
      `/api/role-module-permissions/modulespermissionsByRole`,
      {
        params: { roleId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
