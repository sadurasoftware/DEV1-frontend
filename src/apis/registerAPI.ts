import { ApiResponse, SendUser } from '../types/registerTypes'
import api from '@/lib/api'
import { useLoginInfoStore } from '@/store/useLoginInfoStore'

export const registerUser = async (data: SendUser): Promise<ApiResponse> => {
  const response = await api.post<ApiResponse>(
    `/api/auth/register`,
    data
  )
  return response.data
}

export const createUser = async (data: any): Promise<any> => {
  const token = useLoginInfoStore.getState().token
  const response = await api.post<any>(
    `/api/user/create`,
    data, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}