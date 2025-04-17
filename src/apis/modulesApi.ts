import api from '@/lib/api'
import { useLoginInfoStore } from '@/store/useLoginInfoStore'
import { moduleName, modulesResponse } from '@/types/moduleTypes'
import { AxiosResponse } from 'axios'

export const fetchModules = async (): Promise<modulesResponse> => {
  const token = useLoginInfoStore.getState().token
  const response = await api.get('/api/modules/get', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const addModule = async (
  module: moduleName
): Promise<modulesResponse> => {
  const token = useLoginInfoStore.getState().token
  const res: AxiosResponse<modulesResponse> = await api.post(
    '/api/modules/create',
    {
      name: module.name,
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

export const deleteModuleById = async (
  moduleId: number
): Promise<modulesResponse> => {
  const token = useLoginInfoStore.getState().token
  console.log(`ModuleId:${moduleId}\tToken:${token}`)
  const res: AxiosResponse<modulesResponse> = await api.delete(
    `/api/role-module-permissions/delete-module/${moduleId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (res.status !== 200) {
    throw new Error('Error deleting role')
  }
  return res.data
}

export const updateModule = async (
  id: number,
  name: string
): Promise<modulesResponse> => {
  const token = useLoginInfoStore.getState().token
  const response = await api.put(
    `/api/modules/update/${id}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}
