import { UpdateUserData } from '../types/edituserTypes'
import api from '@/lib/api'

export const updateUser = async (userId: number, data: UpdateUserData) => {
  try {
    const response = await api.put(
      `/api/user/${userId}`,
      data
    )
    return response.data
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}
