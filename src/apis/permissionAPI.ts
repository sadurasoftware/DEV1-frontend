import api from '@/lib/api'
import { useLoginInfoStore } from '@/store/useLoginInfoStore'
import { permissionName, permissionsResponse } from '@/types/permissionsTypes'
import { AxiosResponse } from 'axios'

export const fetchPermissions = async (): Promise<permissionsResponse> => {
  const token = useLoginInfoStore.getState().token
  try {
    const response = await api.get(
      '/api/permissions/get',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const addPermission = async (
  permission: permissionName
): Promise<permissionsResponse> => {
  const token = useLoginInfoStore.getState().token
  const res: AxiosResponse<permissionsResponse> = await api.post(
    '/api/permissions/create',
    {
      name: permission.name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!res || !res.data) {
    throw new Error('Error fetching API')
  }

  return res.data
}

export const deletePermissionById = async (
  permissionId: number
): Promise<permissionsResponse> => {
  const token = useLoginInfoStore.getState().token
  const res: AxiosResponse<permissionsResponse> = await api.delete(
    `/api/role-module-permissions/delete-permission/${permissionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (res.status !== 200) {
    throw new Error('Error deleting permission')
  }
  return res.data
}

export const updatePermission = async (
  id: number,
  name: string
): Promise<permissionsResponse> => {
  const token = useLoginInfoStore.getState().token
  const response = await api.put(
    `/api/permissions/update/${id}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}
