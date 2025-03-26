import axios from 'axios'
import { useLoginInfoStore } from '../store/useLoginInfoStore'
import { ApiResponse, Ticket } from '../types/ticketTypes'

export const createTicket = async (data: Ticket): Promise<ApiResponse> => {
  const token = useLoginInfoStore.getState().token
  const response = await axios.post<ApiResponse>(
    'http://localhost:3000/api/tickets/create',
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}
