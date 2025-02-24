import { RoleModulePermissionCreate } from '@/apis/roleModulePermissionCreateApii'
import { ErrorResponse } from '@/types/loginType'
import { createModulePermissionType } from '@/types/roleModulePermissionType'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

export const useRoleModulePermissionCreate = () => {
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (roleModulePermission: createModulePermissionType) =>
      RoleModulePermissionCreate(roleModulePermission),
    onSuccess: data => {
      console.log('Module with Permissions creates successfully:', data)
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
