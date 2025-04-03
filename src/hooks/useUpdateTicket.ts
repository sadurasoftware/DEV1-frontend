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
    mutationFn: async ({ id, ticket }:{id:string, ticket:any}) => {
      return await updateTicket(id, ticket)
    },
    onSuccess: ticket => {
      console.log('Ticket data updated:', ticket)
    },
    onError: (error: any) => {
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
