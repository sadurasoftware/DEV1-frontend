import { useMutation } from '@tanstack/react-query'
import { deletePermissionById } from '@/apis/permissionAPI'
import { permissionsResponse } from '../types/permissionsTypes'
import { ErrorResponse } from '@/types/loginType'

export const useDeletePermissionById = () => {
  const {
    mutate: deletePermission,
    isError: isPermissionError,
    error: permissionError,
    isPending: deletePermissionPending,
  } = useMutation<permissionsResponse, ErrorResponse, number>({
    mutationFn: (id: number) => deletePermissionById(id),
  })

  return {
    deletePermission,
    isPermissionError,
    permissionError,
    deletePermissionPending,
  }
}
