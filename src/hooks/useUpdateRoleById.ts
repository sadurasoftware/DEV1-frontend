import { useMutation } from '@tanstack/react-query'
import { updateRole } from '@/apis/rolesApi'
import { rolesResponse } from '../types/roleTypes'
import axios, { AxiosError } from 'axios'
import { ErrorResponse } from '@/types/loginType'

export const useUpdateRoleById = () => {
  const {
    mutate,
    isPending: updateRolePending,
    isError: isRoleUpdateError,
    error: updateRoleError,
    isSuccess: updateRoleSuccess,
  } = useMutation<rolesResponse, ErrorResponse, { id: number; name: string }>({
    mutationFn: async ({ id, name }) => {
      return await updateRole(id, name)
    },
    onSuccess: data => {
      console.log('Role data updated:', data)
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
    updateRolePending,
    isRoleUpdateError,
    updateRoleError,
    updateRoleSuccess,
  }
}
