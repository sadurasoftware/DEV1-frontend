import { UpdateAdminData } from '../types/editadminTypes'
import api from '@/lib/api'
export const updateAdmin = async (userId: number, data: UpdateAdminData) => {
  try {
    const response = await api.put(
      `/api/admin/${userId}`,
      data
    )
    return response.data
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}
