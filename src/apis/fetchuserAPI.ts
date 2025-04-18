import api from '@/lib/api'
import { User } from '../types/loginType'

export const fetchUser = async (userId: number): Promise<User> => {
  try {
    const response = await api.get(`/api/user/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}
