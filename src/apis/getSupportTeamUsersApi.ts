import axios from 'axios'

export const getSupportTeamUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/tickets/support-team`)
    return response.data
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}
