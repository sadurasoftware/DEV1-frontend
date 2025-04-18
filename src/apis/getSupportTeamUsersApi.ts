import api from "@/lib/api"

export const getSupportTeamUsers = async () => {
  try {
    const response = await api.get(`/api/tickets/support-team`)
    return response.data
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}
