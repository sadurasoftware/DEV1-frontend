import { RoleModulePermission } from '@/types/roleModulePermissionType'
import axios, { AxiosResponse } from 'axios'
import { useLoginInfoStore } from '../store/useLoginInfoStore'

export const RoleModulePermissionUpdate = async (
  data: RoleModulePermission,
  id: number
): Promise<RoleModulePermission> => {
  const token = useLoginInfoStore.getState().token

  try {
    const res: AxiosResponse<RoleModulePermission> = await axios.put(
      `http://localhost:3000/api/role-module-permissions/update/${id}`,
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
