import {
  createModulePermissionType,
  successResponse,
} from '@/types/roleModulePermissionType'
import { AxiosResponse } from 'axios'
import { useLoginInfoStore } from '../store/useLoginInfoStore'
import api from '@/lib/api'

export const RoleModulePermissionCreate = async (
  data: createModulePermissionType
): Promise<successResponse> => {
  const token = useLoginInfoStore.getState().token

  try {
    const res: AxiosResponse<successResponse> = await api.post(
      '/api/role-module-permissions/create',
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
    return res.data
  } catch (error) {
    console.error('Error creating role module permissions:', error)
    throw new Error('Failed to create role module permissions')
  }
}
