import { ApiResponse, SendUser } from '../types/registerTypes'
import api from '@/lib/api'

export const registerUser = async (data: SendUser): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    `/api/auth/register`,
    data
  )
  return response.data
}
