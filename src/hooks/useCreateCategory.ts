import { addCategory } from '@/apis/categoryAPI'
import { categoryName } from '@/types/categoryTypes'
import { useMutation } from '@tanstack/react-query'

export const useCreateCategory = () => {
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (category: categoryName) => addCategory(category),
  })

  return { mutate, isPending, isError, isSuccess, error, data }
}
