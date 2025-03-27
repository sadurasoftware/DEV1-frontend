import { addCategory } from '@/apis/categoryAPI'
import { categoryName } from '@/types/categoryTypes'
import { ErrorResponse } from '@/types/registerTypes'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

export const useCreateCategory = () => {
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (category: categoryName) => addCategory(category),
    onSuccess: data => {
      console.log('Module added:', data)
    },
    onError: (error: AxiosError<ErrorResponse>) => {
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
