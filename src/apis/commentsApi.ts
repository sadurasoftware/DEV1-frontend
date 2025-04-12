import axios from 'axios'
import { useLoginInfoStore } from '../store/useLoginInfoStore'

export const createComment = async (data: FormData, ticketId:string): Promise<any> => {
  const token = useLoginInfoStore.getState().token
  const response = await axios.post<any>(
    `http://localhost:3000/api/comments/${ticketId}`,
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

export const fetchCommentsByTicketId = async(ticketId:string) => {
 const response = await axios.get(`http://localhost:3000/api/comments/get/${ticketId}`)
  return response.data
}