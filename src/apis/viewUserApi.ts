import axios from 'axios'
import { useLoginInfoStore } from '../store/useLoginInfoStore'

export const getUser = async (id: number): Promise<any> => {
    const token = useLoginInfoStore.getState().token
  try {
    const response = await axios.get(`http://localhost:3000/api/user/view/${id}`,
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
