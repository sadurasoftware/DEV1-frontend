import { useMutation } from '@tanstack/react-query'
import { updateTicket } from '@/apis/ticketAPI'
import axios, { AxiosError } from 'axios'

export const useUpdateTicket = () => {
  const {
    mutate,
    isPending: updateTicketPending,
    isError: isTicketUpdateError,
    error: updateTicketError,
    isSuccess: updateTicketSuccess,
  } = useMutation({
    mutationFn: async ({ id, formData }:{id:string, formData:FormData}) => {
      return await updateTicket(id, formData)
    },
    onSuccess: formData => {
      console.log('Ticket data updated:', formData)
    },
    onError: (error: AxiosError) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        console.error(axiosError.message || 'An unexpected error occurred')
      } else {
        console.error('An unexpected error occurred.', error)
      }
    },
  })

  return {
    mutate,
    updateTicketPending,
    isTicketUpdateError,
    updateTicketError,
    updateTicketSuccess,
  }
}
