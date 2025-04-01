import axios from 'axios'
import { useLoginInfoStore } from '../store/useLoginInfoStore'
import { ApiResponse, ticketResponse } from '../types/ticketTypes'

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

export const getAllTickets = async(status:string, priority:string, search:string, page:number) :Promise<ticketResponse> =>{
  const response = await axios.get<ticketResponse>(
    `http://localhost:3000/api/tickets/get-all-tickets?status=${status}&priority=${priority}&search=${search}&page=${page}&limit=5`
  )
  return response.data
}