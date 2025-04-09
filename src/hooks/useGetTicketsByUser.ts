import { getTicketsByUserId } from "@/apis/ticketAPI";
import { useQuery } from "@tanstack/react-query";

export const useGetTicketsByUser = (id:string) => {
    const { isLoading:ticketLoading, data:ticketData, isError:isTicketError, error:ticketError, refetch } = useQuery(
        {
          queryKey: ['userTickets', id],
          queryFn: ()=>getTicketsByUserId(id),
          enabled: !!id,
        }
      )
     
      return { ticketLoading, ticketData, isTicketError, ticketError, refetch }
}