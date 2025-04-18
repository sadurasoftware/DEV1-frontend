import { deleteTicket } from '@/apis/ticketAPI'
import { useMutation } from '@tanstack/react-query'

export const useDeleteTicket = () => {
  const {
    mutate: ticketDelete,
    isError: isTicketError,
    error: ticketError,
    isPending: deleteTicketPending,
  } = useMutation({
    mutationFn: (id: string) => deleteTicket(id),
    onSuccess: () => {
      console.log('Ticket deleted successfully')
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