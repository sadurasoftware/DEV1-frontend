import { useMutation } from '@tanstack/react-query'
import { addRole } from '@/apis/rolesApi'
import { roleName } from '@/types/roleTypes'
import axios, { AxiosError } from 'axios'
import { ErrorResponse } from '@/types/registerTypes'

export const useCreateRole = () => {
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (role: roleName) => addRole(role),
    onSuccess: data => {
      console.log('Role added:', data)
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
