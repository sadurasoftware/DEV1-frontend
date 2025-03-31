import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { createTicket } from '../apis/ticketAPI'
import { ApiResponse, ErrorResponse } from '../types/ticketTypes'

export const useCreateTicketMutation = () => {
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (data: FormData) => createTicket(data),
    onSuccess: (data: ApiResponse) => {
      console.log('Ticket created:', data)
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        console.error(
          error.response?.data.message || 'An unexpected error occurred'
        )
      } else {
        console.error('An unexpected error occurred.')
      }
    },
  })

  return { mutate, isPending, isError, isSuccess, error, data }
}
