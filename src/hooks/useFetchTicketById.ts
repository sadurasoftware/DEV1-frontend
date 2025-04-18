import { getTicketById } from "@/apis/ticketAPI";
import { useQuery } from "@tanstack/react-query";

export const useFetchTicketById = (id:string) => {
    const { isLoading:ticketLoading, data:ticketData, isError:isTicketError, error:ticketError } = useQuery(
        {
          queryKey: ['ticket', id],
          queryFn: ()=>getTicketById(id),
          enabled: !!id,
        }
      )
     
      return { ticketLoading, ticketData, isTicketError, ticketError }
}