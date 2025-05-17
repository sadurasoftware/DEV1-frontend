import { deleteComment } from "@/apis/commentsApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteComment = () => {
    const queryClient = useQueryClient()
    const {
        mutate: commentDelete,
        isError: isCommentError,
        error: commentError,
        isPending: deleteCommentPending,
        isSuccess:deleteSuccess,
        data: commentDeleteData
      } = useMutation({
        mutationFn: (id: string) => deleteComment(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] })
          }
      })
    
      return {
        commentDelete,
        isCommentError,
        commentError,
        deleteCommentPending,
        deleteSuccess,
        commentDeleteData
      }
}