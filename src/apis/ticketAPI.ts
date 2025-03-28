import axios from 'axios'
import { useLoginInfoStore } from '../store/useLoginInfoStore'
import { ApiResponse } from '../types/ticketTypes'

export const createTicket = async (data: FormData): Promise<ApiResponse> => {
  const token = useLoginInfoStore.getState().token
  const response = await axios.post<ApiResponse>(
    'http://localhost:3000/api/tickets/create',
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return response.data
}
