import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '../apis/forgotpasswordAPI'
import { ErrorResponse } from '../types/loginType'
import { AxiosError } from 'axios'
import { useState } from 'react'

export const useForgotPasswordMutation = () => {
  const [error, setError] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  const { mutate, isPending, isError, isSuccess, data } = useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onSuccess: data => {
      console.log('Password reset link sent successfully:', data)
      setSuccessMessage('Password reset link sent successfully')
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        setError(error.response?.data.message || 'An unexpected error occurred')
      } else {
        setError('An unexpected error occurred.')
      }
    },
  })

  return { mutate, isPending, isError, isSuccess, successMessage, error, data }
}
