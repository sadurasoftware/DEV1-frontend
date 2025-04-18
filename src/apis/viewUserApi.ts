import api from '@/lib/api'
import { useLoginInfoStore } from '../store/useLoginInfoStore'

export const getUser = async (id: any): Promise<any> => {
    const token = useLoginInfoStore.getState().token
  try {
    const response = await api.get(`/api/user/view/${id}`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
    )
    return response.data
  } catch (error) {
    console.error('Error updating user:', error)
    throw error
  }
}
