import { useQuery } from '@tanstack/react-query'
import { fetchAdmins } from '../apis/adminsFetchApi'
import { adminsResponse } from '@/types/registerTypes'

export const useFetchAdmins = (page: number, search: string, departmentName: string) => {
  const {
    isLoading: adminLoading,
    data: adminsData,
    isError: isAdminsError,
    error: adminsError,
  } = useQuery<adminsResponse, Error>({
    queryKey: ['admins', page, search, departmentName],
    queryFn: () => fetchAdmins(page, search, departmentName),
  })

  return { adminLoading, adminsData, isAdminsError, adminsError }
}
