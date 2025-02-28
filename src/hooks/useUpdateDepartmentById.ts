import { updateDepartment } from '@/apis/departementAPI'
import { ErrorResponse } from '@/types/loginType'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
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
    onSuccess: data => {
      console.log('Module data updated:', data)
    },
    onError: (error: ErrorResponse) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError
        console.error(axiosError.message || 'An unexpected error occurred')
      } else {
        console.error('An unexpected error occurred.', error)
      }
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
