import axios, { AxiosResponse } from 'axios'
import { roleName, rolesResponse } from '@/types/roleTypes'

export const addRole = async (role: roleName): Promise<rolesResponse> => {
  const res: AxiosResponse<rolesResponse> = await axios.post(
    'http://localhost:3000/api/roles/create',
    {
      name: role.name,
    }
  )

  if (!res || !res.data) {
    throw new Error('Error fetching API')
  }

  return res.data
}

export const deleteRoleById = async (id: number): Promise<rolesResponse> => {
  const res: AxiosResponse<rolesResponse> = await axios.delete(
    `http://localhost:3000/api/roles/delete/${id}`
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
  try {
    const response = await axios.put(
      `http://localhost:3000/api/roles/update/${id}`,
      { name }
    )
    return response.data
  } catch (error) {
    throw error
  }
}
