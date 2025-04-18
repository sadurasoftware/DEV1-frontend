import api from '@/lib/api'
import { ApiResponse } from '../types/registerTypes'

export const resetPassword = async (
  password: string,
  token: string
): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    '/api/auth/reset-password',
    { newPassword: password, token }
  )
  return response.data
}
