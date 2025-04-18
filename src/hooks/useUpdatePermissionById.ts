import { useMutation } from '@tanstack/react-query'
import { updatePermission } from '@/apis/permissionAPI'
import { permissionsResponse } from '../types/permissionsTypes'
import axios, { AxiosError } from 'axios'
import { ErrorResponse } from '@/types/loginType'

export const useUpdatePermissionById = () => {
  const {
    mutate,
    data: updatedRole,
    isPending: updatePermissionPending,
    isError: isPermissionUpdateError,
    error: updatePermissionError,
    isSuccess: updatePermissionSuccess,
  } = useMutation<
    permissionsResponse,
    ErrorResponse,
    { id: number; name: string }
  >({
    mutationFn: async ({ id, name }) => {
      return await updatePermission(id, name)
    },
    onSuccess: data => {
      console.log('Permission data updated:', data)
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
    updatedRole,
    updatePermissionPending,
    isPermissionUpdateError,
    updatePermissionError,
    updatePermissionSuccess,
  }
}
