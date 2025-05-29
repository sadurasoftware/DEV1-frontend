import { updateDepartment } from '@/apis/departementAPI'
import { ErrorResponse } from '@/types/loginType'
import { useMutation } from '@tanstack/react-query'
import { departmentsResponse } from '../types/departmentTypes'

export const useUpdateDepartmentById = () => {
  const {
    mutate,
    isPending: updateDepartmentPending,
    isError: isDepartmentUpdateError,
    error: updateDepartmentError,
    isSuccess: updateDepartmentSuccess,
  } = useMutation<
    departmentsResponse,
    ErrorResponse,
    { id: number; name: string }
  >({
    mutationFn: async ({ id, name }) => {
      return await updateDepartment(id, name)
    },
  })

  return {
    mutate,
    updateDepartmentPending,
    isDepartmentUpdateError,
    updateDepartmentError,
    updateDepartmentSuccess,
  }
}
