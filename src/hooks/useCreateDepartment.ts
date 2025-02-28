import { addDepartment } from '@/apis/departementAPI'
import { departmentName } from '@/types/departmentTypes'
import { ErrorResponse } from '@/types/registerTypes'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

export const useCreateDepartment = () => {
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (department: departmentName) => addDepartment(department),
    onSuccess: data => {
      console.log('Department added:', data)
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        console.error(
          error.response?.data.message || 'An unexpected error occurred'
        )
      } else {
        console.error('An unexpected error occurred.')
      }
    },
  })

  return { mutate, isPending, isError, isSuccess, error, data }
}
