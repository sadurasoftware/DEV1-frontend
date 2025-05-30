import { updateCategory } from '@/apis/categoryAPI'
import { ErrorResponse } from '@/types/loginType'
import { useMutation } from '@tanstack/react-query'
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
   
  })

  return {
    mutate,
    updateCategoryPending,
    isCategoryUpdateError,
    updateCategoryError,
    updateCategorySuccess,
  }
}
