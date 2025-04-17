import { deleteComment } from "@/apis/commentsApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteComment = () => {
    const queryClient = useQueryClient()
    const {
        mutate: commentDelete,
        isError: isCommentError,
        error: commentError,
        isPending: deleteCommentPending,
        isSuccess:deleteSuccess
      } = useMutation({
        mutationFn: (id: string) => deleteComment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] })
          },
        onError: (error: any) => {
          console.error('Error deleting comment:', error)
        },
      })
    
      return {
        commentDelete,
        isCommentError,
        commentError,
        deleteCommentPending,
        deleteSuccess
      }
}