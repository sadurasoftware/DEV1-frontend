import { createComment } from "@/apis/commentsApi";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from "axios";

export const useCreateComment  = () => {
  const queryClient = useQueryClient()
    const { mutate:createCommentMutation, isPending, isError, isSuccess, error, data } = useMutation({
      mutationFn: ({data, ticketId}:{data: FormData, ticketId:string}) => createComment(data, ticketId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments'] })
      },
      onError: (error: any) => {
        if (axios.isAxiosError(error)) { 
          const axiosError = error as AxiosError
          console.error(axiosError.message || 'An unexpected error occurred')
        } else {
          console.error('An unexpected error occurred.', error)
        }
      }
    })
  
    return { createCommentMutation, isPending, isError, isSuccess, error, data }
  }