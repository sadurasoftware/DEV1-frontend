import { deleteTicket } from '@/apis/ticketAPI'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteTicket = () => {
  const queryClient = useQueryClient()
  const {
    mutate: ticketDelete,
    isError: isDeleteTicketError,
    error: deleteticketError,
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
    isDeleteTicketError, 
    deleteticketError,
    deleteTicketPending,
  }
}