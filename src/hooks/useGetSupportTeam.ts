import { useQuery } from '@tanstack/react-query'
import { getSupportTeamUsers } from '@/apis/getSupportTeamUsersApi'

export const useGetSupportTeam = () => {
  const { isLoading:usersLoading, data:usersData, isError:isUsersError, error:usersError } = useQuery(
    {
      queryKey: ['support_team'],
      queryFn: () => getSupportTeamUsers(),
    }
  )

  return { usersLoading, usersData, isUsersError, usersError }
}
