import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../apis/categoryAPI'

export const useFetchCategories = () => {
  const {
    isLoading: categoriesLoading,
    data: categoriesData,
    isError: isCategoriesError,
    error: categoriesError,
    refetch,
  } = useQuery<any>({
    queryKey: ['category'],
    queryFn: fetchCategories,
  })

  return {
    categoriesLoading,
    categoriesData: categoriesData || [],
    isCategoriesError,
    categoriesError,
    refetch,
  }
}
