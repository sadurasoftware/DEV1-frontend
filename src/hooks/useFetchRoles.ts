import { useQuery } from '@tanstack/react-query'
import { fetchRoles } from '../apis/rolesApi'
import { rolesResponse } from '../types/roleTypes'

export const useFetchRoles = () => {
  const {
    isLoading: rolesLoading,
    data: rolesData,
    isError: isRolesError,
    error: rolesError,
    refetch,
  } = useQuery<rolesResponse>({
    queryKey: ['roles'],
    queryFn: fetchRoles,
  })

  return { rolesLoading, rolesData, isRolesError, rolesError, refetch }
}
