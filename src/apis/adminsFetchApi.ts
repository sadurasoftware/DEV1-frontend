import api from '@/lib/api'
import { adminsResponse } from '@/types/registerTypes'
import { useLoginInfoStore } from '@/store/useLoginInfoStore'

export const fetchAdmins = async (page:number, search:string, departmentName:string): Promise<adminsResponse> => {
  const token = useLoginInfoStore.getState().token
  try {
    const response = await api.get(
      `/api/user/admins?page=${page}&search=${search}&departmentName=${departmentName}`,
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
