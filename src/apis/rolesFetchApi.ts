import axios from 'axios'
import { rolesResponse } from '../types/roleTypes'

export const fetchRoles = async (): Promise<rolesResponse> => {
  try {
    const response = await axios.get('http://localhost:3000/api/roles/get')
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}
