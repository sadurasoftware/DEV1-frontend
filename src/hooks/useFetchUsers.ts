import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../apis/usersFetchApi'
import { User } from '../types/loginType'

export const useFetchUsers = () => {
  const {
    isLoading: usersLoading,
    data: users,
    isError: isUsersError,
    error: usersError,
    refetch,
  } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  return { usersLoading, users, isUsersError, usersError, refetch }
}
