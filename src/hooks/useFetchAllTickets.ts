import { useQuery } from '@tanstack/react-query'
import { getAllTickets } from '../apis/ticketAPI'
import { ticketResponse } from '../types/ticketTypes'

export const useFetchAllTickets = (
    status: string, 
    priority: string, 
    search: string, 
    page: number
) => {
  const {
    isLoading: ticketsLoading,
    data: tickets,
    isError: isTicketsError,
    error: ticketsError,
  } = useQuery<ticketResponse, Error>({
    queryKey: ['tickets', status, priority, search, page],
    queryFn: () => getAllTickets(status, priority, search, page),
  })

  return { ticketsLoading, tickets, isTicketsError, ticketsError }
}