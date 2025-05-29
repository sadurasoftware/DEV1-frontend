import { useMutation } from '@tanstack/react-query'
import { updatePermission } from '@/apis/permissionAPI'
import { permissionsResponse } from '../types/permissionsTypes'
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
