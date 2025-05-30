import { useMutation } from '@tanstack/react-query'
import { updateRole } from '@/apis/rolesApi'
import { rolesResponse } from '../types/roleTypes'
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
  })

  return {
    mutate,
    updateRolePending,
    isRoleUpdateError,
    updateRoleError,
    updateRoleSuccess,
  }
}
