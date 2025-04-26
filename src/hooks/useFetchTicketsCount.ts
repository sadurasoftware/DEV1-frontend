import { ticketsCount } from "@/apis/ticketAPI"
import { useQuery } from "@tanstack/react-query"

export const useFetchTicketsCount = () => {
    const {isLoading:ticketsCountLoading, data:ticketsCountData, isError:isTicketsCountError, error: ticketsCountError} = useQuery({
        queryKey:['ticketsCount'],
        queryFn: ticketsCount,
    })
    return {ticketsCountLoading, ticketsCountData, isTicketsCountError, ticketsCountError}
}