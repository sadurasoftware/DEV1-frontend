import axios from 'axios'
import { permissionsResponse } from '../types/permissionsTypes'

export const fetchPermissions = async (): Promise<permissionsResponse> => {
  try {
    const response = await axios.get(
      'http://localhost:3000/api/permissions/get'
    )
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}
