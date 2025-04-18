import api from '@/lib/api'
import { GetUserResponse } from '../types/loginType'

export const getUser = async (userId: number): Promise<GetUserResponse> => {
  try {
    const response = await api.get(`/api/user/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}
