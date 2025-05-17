import { useMutation } from '@tanstack/react-query'
// import { ApiResponse, ErrorResponse, SendUser } from '../types/registerTypes'
import { createUser } from '../apis/registerAPI'
import axios, { AxiosError } from 'axios'

export const useCreateUserMutation = () => {
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (user: any) => createUser(user),
    onSuccess: (data: any) => {
      console.log('User Registered:', data)
    },
    onError: (error: AxiosError<any>) => {
      if (axios.isAxiosError(error)) {
        console.error(
          error.response?.data.message || 'An unexpected error occurred'
        )
      } else {
        console.error('An unexpected error occurred.')
      }
    },
  })

  return { mutate, isPending, isError, isSuccess, error, data }
}
