import { useQuery } from "@tanstack/react-query"
import { ticketHistory } from "@/apis/ticketAPI"

export const useGetTicketHistory = (ticketId:string) =>{
    const { isLoading:historyLoading, data:historyData, isError:isHistoryError, error:historyError } = useQuery(
        {
          queryKey: ['ticketHistory', ticketId],
          queryFn: () => ticketHistory(ticketId),
          enabled: !!ticketId,
        }
      )
    
      return { historyLoading, historyData, isHistoryError, historyError }
    }