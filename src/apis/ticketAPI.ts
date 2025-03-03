import axios from 'axios'
import { ApiResponse, Ticket } from '../types/ticketTypes'

export const createTicket = async (data: Ticket): Promise<ApiResponse> => {
  const response = await axios.post<ApiResponse>(
    'http://localhost:3000/api/auth/create-ticket',
    data
  )
  return response.data
}
