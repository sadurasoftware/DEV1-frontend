import { deleteDepartmentById } from '@/apis/departementAPI'
import { ErrorResponse } from '@/types/loginType'
import { useMutation } from '@tanstack/react-query'
import { departmentsResponse } from '../types/departmentTypes'

export const useDeleteDepartmentById = () => {
  const {
    mutate: deleteDepartment,
    isError: isDepartmentError,
    error: departmentError,
    isPending: deleteDepartmentPending,
  } = useMutation<departmentsResponse, ErrorResponse, number>({
    mutationFn: (id: number) => deleteDepartmentById(id),
  
  })

  return {
    deleteDepartment,
    isDepartmentError,
    departmentError,
    deleteDepartmentPending,
  }
}
