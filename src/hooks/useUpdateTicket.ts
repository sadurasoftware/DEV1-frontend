import { useQueryClient, useMutation } from '@tanstack/react-query'
import { updateTicket } from '@/apis/ticketAPI'

export const useUpdateTicket = () => {
  const queryClient = useQueryClient()
  const { 
    mutate,
    isPending: updateTicketPending,
    isError: isTicketUpdateError,
    error: updateTicketError,
    isSuccess: updateTicketSuccess,
    data
  } = useMutation({
    mutationFn: async ({ id, formData }:{id:string, formData:FormData}) => {
      return await updateTicket(id, formData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticket'] })
    },
  })

  return {
    mutate,
    updateTicketPending,
    isTicketUpdateError,
    updateTicketError,
    updateTicketSuccess,
    data
  }
}
