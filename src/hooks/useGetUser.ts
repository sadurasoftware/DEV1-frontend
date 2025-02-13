import { useQuery } from '@tanstack/react-query'
import { getUser } from '../apis/getuserAPI'
import { GetUserResponse } from '../types/loginType'

export const useGetUsers = (userId: number) => {
  const { isLoading, data, isError, error } = useQuery<GetUserResponse, Error>({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  })

  return { isLoading, data, isError, error }
}
