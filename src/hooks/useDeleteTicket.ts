import { deleteTicket } from '@/apis/ticketAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteTicket = () => {
  const queryClient = useQueryClient()
  const {
    mutate: ticketDelete,
    isError: isTicketError,
    error: ticketError,
    isPending: deleteTicketPending,
  } = useMutation({
    mutationFn: (id: string) => deleteTicket(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userTickets'] })
    },
    onError: (error: any) => {
      console.error('Error deleting role:', error)
    },
  })

  return {
    ticketDelete,
    isTicketError,
    ticketError,
    deleteTicketPending,
  }
}