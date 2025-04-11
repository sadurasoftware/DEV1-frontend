import axios from 'axios'

export const getImage = async (ticketId: any, filename:any): Promise<any> => {
    console.log('ticketId:',ticketId)
    console.log('filename:',filename)

  try {
    const response = await axios.get(`http://localhost:3000/api/tickets/get-image/${ticketId}/${filename}}`)
    return response.data
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}
