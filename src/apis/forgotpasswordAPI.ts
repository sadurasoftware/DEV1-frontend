import { ApiResponse } from '../types/registerTypes'
import api from '@/lib/api'

export const forgotPassword = async (email: string): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    '/api/auth/forget-password',
    { email }
  )
  return response.data
}
