import { useMutation } from '@tanstack/react-query'
import { permissionName } from '@/types/permissionsTypes'
import axios, { AxiosError } from 'axios'
import { ErrorResponse } from '@/types/registerTypes'
import { addPermission } from '@/apis/permissionAPI'

export const useCreatePermission = () => {
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (permission: permissionName) => addPermission(permission),
    onSuccess: data => {
      console.log('Permission added:', data)
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
