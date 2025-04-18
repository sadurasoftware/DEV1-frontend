import { RoleModulePermission } from '@/types/roleModulePermissionType'
import { AxiosResponse } from 'axios'
import { useLoginInfoStore } from '../store/useLoginInfoStore'
import api from '@/lib/api'

export const RoleModulePermissionUpdate = async (
  data: RoleModulePermission,
  id: number
): Promise<RoleModulePermission> => {
  const token = useLoginInfoStore.getState().token

  try {
    const res: AxiosResponse<RoleModulePermission> = await api.put(
      `/api/role-module-permissions/update/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (res.status !== 200) {
      throw new Error('Error fetching API: ' + res.status)
    }
    console.log(data)
    return res.data
  } catch (error) {
    console.error('Error updating role module permissions:', error)
    throw new Error('Failed to update role module permissions')
  }
}
