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

export const assignTicket = async(id:string, assignedTo:number)  => {
  const response = await axios.patch(`http://localhost:3000/api/tickets/assign-ticket/${id}`, { assignedTo })
  return response.data
}

export const getTicketById = async(id:string) =>{
  const response = await axios.get(`http://localhost:3000/api/tickets/get-ticket/${id}`)
  return response.data
}

export const updateTicket = async (id: string, data: any) => {
  console.log(`Id:${id}`)
  console.log('data', data)
  const token = useLoginInfoStore.getState().token
  try {
    const response = await axios.put(
      `http://localhost:3000/api/tickets/update-ticket/${id}`,
        data
      ,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
    return response.data
  } catch (error) {
    console.error('Error updating Ticket:', error)
    throw error
  }
}

export const updateTicketStatus = async(id:string, status:string)  => {
  const token = useLoginInfoStore.getState().token
  console.log('status:',status )
  const response = await axios.put(`http://localhost:3000/api/tickets/update-ticket-status/${id}`,
     { status },
     {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  return response.data
}

export const getTicketsByUserId = async(id:string) =>{
  const response = await axios.get(`http://localhost:3000/api/tickets/user-tickets/${id}`)
  return response.data
}