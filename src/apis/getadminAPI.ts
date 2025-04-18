import api from '@/lib/api'
import { GetAdminResponse } from '../types/loginType'

export const getAdmin = async (userId: number): Promise<GetAdminResponse> => {
  try {
    const response = await api.get(
      `/api/admin/${userId}`
    )
    return response.data
  } catch (error) {
    console.error('Error fetching admin:', error)
    throw error
  }
}
