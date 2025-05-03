import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '../apis/forgotpasswordAPI'
import { ErrorResponse } from '../types/loginType'
import { AxiosError } from 'axios'

export const useForgotPasswordMutation = () => {


  const { mutate, isPending, isError, isSuccess, data, error } = useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onSuccess: data => {
      console.log('Password reset link sent successfully:', data)

    },
    onError: (error: AxiosError<any, ErrorResponse>) => {
      if (error.response) {
       console.error(error.response?.data.message || 'An unexpected error occurred')
      } else {
        console.error('An unexpected error occurred.')
      }
    },
  })

  return { mutate, isPending, isError, error, isSuccess, data }
}
