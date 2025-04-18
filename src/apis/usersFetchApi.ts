import api from '@/lib/api'
import { ApiResponse, usersResponse } from '../types/registerTypes'

export const fetchUsers = async (page:number, search:string, departmentName:string): Promise<usersResponse> => {
  try {
    const response = await api.get(
      `/api/user/users?page=${page}&search=${search}&departmentId=${departmentName}`
    ) 
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const deleteUser = async (userId: number): Promise<ApiResponse> => {
  const response = await api.delete(
    `/api/super-admin/users/${userId}`
  )
  return response.data
}
