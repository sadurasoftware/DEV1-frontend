import { useLoginInfoStore } from '@/store/useLoginInfoStore'
import { roleName, rolesResponse } from '@/types/roleTypes'
import axios, { AxiosResponse } from 'axios'

export const fetchRoles = async (): Promise<rolesResponse> => {
  const token = useLoginInfoStore.getState().token
  console.log(token)
  const response = await axios.get('http://localhost:3000/api/roles/get', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const addRole = async (role: roleName): Promise<rolesResponse> => {
  const token = useLoginInfoStore.getState().token
  const res: AxiosResponse<rolesResponse> = await axios.post(
    'http://localhost:3000/api/roles/create',
    {
      name: role.name,
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

export const deleteRoleById = async (
  roleId: number
): Promise<rolesResponse> => {
  const token = useLoginInfoStore.getState().token
  console.log('RoleId:${roleId}\tToken:${token}')
  const res: AxiosResponse<rolesResponse> = await axios.delete(
    `http://localhost:3000/api/role-module-permissions/delete-role/${roleId}`,
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

export const updateRole = async (
  id: number,
  name: string
): Promise<rolesResponse> => {
  const token = useLoginInfoStore.getState().token
  const response = await axios.put(
    `http://localhost:3000/api/roles/update/${id}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}
