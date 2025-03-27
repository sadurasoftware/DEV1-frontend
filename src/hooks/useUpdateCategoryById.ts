import { updateCategory } from '@/apis/categoryAPI'
import { ErrorResponse } from '@/types/loginType'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { categoriesResponse } from '../types/categoryTypes'

export const useUpdateCategoryById = () => {
  const {
    mutate,
    isPending: updateCategoryPending,
    isError: isCategoryUpdateError,
    error: updateCategoryError,
    isSuccess: updateCategorySuccess,
  } = useMutation<
    categoriesResponse,
    ErrorResponse,
    { id: number; name: string }
  >({
    mutationFn: async ({ id, name }) => {
      return await updateCategory(id, name)
    },
    onSuccess: data => {
      console.log('Category updated:', data)
    },
    onError: (error: ErrorResponse) => {
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
    updateCategoryPending,
    isCategoryUpdateError,
    updateCategoryError,
    updateCategorySuccess,
  }
}
