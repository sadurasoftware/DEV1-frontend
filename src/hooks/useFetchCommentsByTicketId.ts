import { useQuery } from "@tanstack/react-query"
import { fetchCommentsByTicketId } from "@/apis/commentsApi"

export const useFetchCommentsByTicketId = (ticketId: string) => {
    const { isLoading: commentsLoading, data: commentsData, isError: isCommentsError, error: commentsError, refetch } = useQuery({
        queryKey: ['comments', ticketId],
        queryFn: () => fetchCommentsByTicketId(ticketId),
        enabled: !!ticketId,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        staleTime: 0,
    })
    return { commentsLoading, commentsData, isCommentsError, commentsError, refetch }
}