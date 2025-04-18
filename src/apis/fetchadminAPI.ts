import api from '@/lib/api'
import { User } from '../types/loginType'

export const fetchAdmin = async (userId: number): Promise<User> => {
  try {
    const response = await api.get(
      `/api/admin/${userId}`
    )
    return response.data
  } catch (error) {
    console.error('Error updating admin:', error)
    throw error
  }
}
