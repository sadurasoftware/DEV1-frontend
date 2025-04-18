import { User } from '../types/loginType'
import api from '@/lib/api'

export const fetchAdmins = async (): Promise<User[]> => {
  try {
    const response = await api.get(
      '/api/super-admin/admins'
    )
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}
