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

export const fetchCommentById = async(commentId:any) =>
{
  const response = await axios.get(`http://localhost:3000/api/comments/${commentId}`)
  return response.data
}

export const updateComment = async (id: any, commentText: any) => {
  console.log(`Id:${id}`)
  console.log(`commentText:${commentText}`)
  const token = useLoginInfoStore.getState().token
  try {
    const response = await axios.put(
      `http://localhost:3000/api/comments/update/${id}`,
      {commentText}
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

export const deleteComment = async(commentId:any)  => {
  const token = useLoginInfoStore.getState().token
  const response = await axios.delete(`http://localhost:3000/api/comments/delete/${commentId}`,
     {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  return response.data
}