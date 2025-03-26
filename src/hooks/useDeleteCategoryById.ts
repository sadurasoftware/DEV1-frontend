import { deleteCategoryById } from '@/apis/categoryAPI'
import { ErrorResponse } from '@/types/loginType'
import { useMutation } from '@tanstack/react-query'
import { categoriesResponse } from '../types/categoryTypes'

export const useDeleteCategoryById = () => {
  const {
    mutate: deleteCategory,
    isError: isCategoryError,
    error: CategoryError,
    isPending: deleteCategoryPending,
  } = useMutation<categoriesResponse, ErrorResponse, number>({
    mutationFn: (id: number) => deleteCategoryById(id),
    onSuccess: () => {
      console.log('Module deleted successfully')
    },
    onError: (error: ErrorResponse) => {
      console.error('Error deleting role:', error)
    },
  })

  return {
    deleteCategory,
    isCategoryError,
    CategoryError,
    deleteCategoryPending,
  }
}
