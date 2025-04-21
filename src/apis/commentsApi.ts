import { useLoginInfoStore } from '../store/useLoginInfoStore'
import api from '@/lib/api'

export const createComment = async (data: FormData, ticketId:string): Promise<any> => {
  const token = useLoginInfoStore.getState().token
  const response = await api.post<any>(
    `/api/comments/${ticketId}`,
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
 const response = await api.get(`/api/comments/get/${ticketId}`)
  return response.data
}

export const fetchCommentById = async(commentId:any) =>
{
  const response = await api.get(`/api/comments/${commentId}`)
  return response.data
}

export const updateComment = async (ticketId: any,  commentId:any, commentText: any) => {
  const token = useLoginInfoStore.getState().token
  try {
    const response = await api.put(
      `/api/comments/update/${ticketId}/${commentId}`,
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
  const response = await api.delete(`/api/comments/delete/${commentId}`,
     {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  return response.data
}