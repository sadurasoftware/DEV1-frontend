import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { updateComment } from '@/apis/commentsApi'

export const useEditComment = () => {
  const {
    mutate,
    isPending: updateCommentPending,
    isError: isCommentUpdateError,
    error: updateCommentError,
    isSuccess: updateCommentSuccess,
  } = useMutation({
    mutationFn: ({ id, commentText }: { id:any, commentText:any }) => updateComment(id, commentText),
    onSuccess: commentText => {
      console.log('comment data updated:', commentText)
    },
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        console.error(axiosError.message || 'An unexpected error occurred')
      } else {
        console.error('An unexpected error occurred.', error)
      }
    },
  })

  return {
    mutate,
    updateCommentPending,
    isCommentUpdateError,
    updateCommentError,
    updateCommentSuccess,
  }
}