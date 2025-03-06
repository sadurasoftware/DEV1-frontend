import axios from 'axios'
import { User } from '../types/loginType'
import { ApiResponse } from '../types/registerTypes'

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/super-admin/users'
    )
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const deleteUser = async (userId: number): Promise<ApiResponse> => {
  const response = await axios.delete(
    `http://localhost:3000/api/super-admin/users/${userId}`
  )
  return response.data
}
