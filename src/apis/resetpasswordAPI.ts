import axios from 'axios'
import { ApiResponse } from '../types/registerTypes'

export const resetPassword = async (
  password: string,
  token: string
): Promise<ApiResponse> => {
  const response = await axios.post<ApiResponse>(
    'http://localhost:3000/api/auth/reset-password',
    { newPassword: password, token }
  )
  return response.data
}
