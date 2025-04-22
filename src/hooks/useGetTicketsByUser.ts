import { getTicketsByUserId } from "@/apis/ticketAPI";
import { useQuery } from "@tanstack/react-query";

export const useGetTicketsByUser = (userId:string) => {
    const { isLoading:ticketLoading, data:ticketData, isError:isTicketError, error:ticketError, refetch } = useQuery(
        {
          queryKey: ['userTickets', userId],
          queryFn: ()=>getTicketsByUserId(userId),
          enabled: !!userId,
        }
      )
     
      return { ticketLoading, ticketData, isTicketError, ticketError, refetch }
}