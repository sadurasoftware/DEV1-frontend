import { useMutation } from '@tanstack/react-query'
import { createTicket } from '../apis/ticketAPI'

export const useCreateTicketMutation = () => {
  const { mutate, isPending, data } = useMutation({
    mutationFn: (data: FormData) => createTicket(data),
   
  })

  return { mutate, isPending, data }
}
