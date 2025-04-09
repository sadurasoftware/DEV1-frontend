import { useQuery } from '@tanstack/react-query'
import { getUser } from '../apis/viewUserApi'

export const useViewUser = (id: number) => {
  const { isLoading, data, isError, error } = useQuery<any>({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
    enabled: !!id,
  })

  return { isLoading, data, isError, error }
}
