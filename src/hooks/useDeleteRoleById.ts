import { useMutation } from '@tanstack/react-query'
import { deleteRoleById } from '@/apis/rolesApi'
import { rolesResponse } from '../types/roleTypes'
import { ErrorResponse } from '@/types/loginType'

export const useDeleteRoleById = () => {
  const {
    mutate: deleteRole,
    isError: isRoleError,
    error: roleError,
    isPending: deleteRolePending,
  } = useMutation<rolesResponse, ErrorResponse, number>({
    mutationFn: (id: number) => deleteRoleById(id),
    onSuccess: () => {
      console.log('Role deleted successfully')
    },
    onError: (error: ErrorResponse) => {
      console.error('Error deleting role:', error)
    },
  })

  return {
    deleteRole,
    isRoleError,
    roleError,
    deleteRolePending,
  }
}
