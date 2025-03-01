import { useQuery } from '@tanstack/react-query'
import { fetchDepartments } from '../apis/departementAPI'
import { departmentsResponse } from '../types/departmentTypes'

export const useFetchDepartments = () => {
  const {
    isLoading: departmentsLoading,
    data: departmentsData,
    isError: isDepartmentsError,
    error: departmentsError,
    refetch,
  } = useQuery<departmentsResponse>({
    queryKey: ['departments'],
    queryFn: fetchDepartments,
  })

  return {
    departmentsLoading,
    departmentsData,
    isDepartmentsError,
    departmentsError,
    refetch,
  }
}
