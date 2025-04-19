import { useQuery } from '@tanstack/react-query'
import { fetchUsers } from '../apis/usersFetchApi'
import { usersResponse } from '../types/registerTypes'

export const useFetchUsers = (page:number, search:string, departmentName:string) => {
  const {
    isLoading: usersLoading,
    data: usersData,
    isError: isUsersError,
    error: usersError,
    refetch,
  } = useQuery<usersResponse, Error>({
    queryKey: ['users', page, search, departmentName],
    queryFn: ()=>fetchUsers(page, search, departmentName),
  })

  return { usersLoading, usersData, isUsersError, usersError, refetch }
}
