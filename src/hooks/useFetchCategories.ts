import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../apis/categoryAPI'
import { categoriesResponse } from '../types/categoryTypes'

export const useFetchCategories = () => {
  const {
    isLoading: categoriesLoading,
    data: categoriesData,
    isError: isCategoriesError,
    error: categoriesError,
    refetch,
  } = useQuery<categoriesResponse>({
    queryKey: ['category'],
    queryFn: fetchCategories,
  })

  return {
    categoriesLoading,
    categoriesData,
    isCategoriesError,
    categoriesError,
    refetch,
  }
}
