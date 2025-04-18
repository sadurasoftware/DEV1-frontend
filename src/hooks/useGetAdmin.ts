import { useQuery } from '@tanstack/react-query'
import { getAdmin } from '../apis/getadminAPI'
import { GetAdminResponse } from '../types/loginType'

export const useGetAdmin = (userId: number) => {
  const { isLoading, data, isError, error } = useQuery<GetAdminResponse, Error>(
    {
      queryKey: ['user', userId],
      queryFn: () => getAdmin(userId),
      enabled: !!userId,
    }
  )

  return { isLoading, data, isError, error }
}
