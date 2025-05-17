import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateComment } from '@/apis/commentsApi'

export const useEditComment = () => {
  const queryClient = useQueryClient()
  const {
    mutate,
    isPending: updateCommentPending,
    data: updateCommentData,
  } = useMutation({
    mutationFn: ({ ticketId, commentId, formData }: { ticketId:any, commentId:any, formData:FormData }) => updateComment(ticketId, commentId, formData),
    onSuccess: ()=> {
      queryClient.invalidateQueries({ queryKey: ['comment'] })
    }
  })

  return {
    mutate,
    updateCommentPending,
    updateCommentData
  }
}