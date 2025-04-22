import api from '@/lib/api'
import { adminsResponse } from '@/types/registerTypes'

export const fetchAdmins = async (page:number, search:string, departmentName:string): Promise<adminsResponse> => {
  try {
    const response = await api.get(
      `/api/user/admins?page=${page}&search=${search}&departmentName=${departmentName}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}
