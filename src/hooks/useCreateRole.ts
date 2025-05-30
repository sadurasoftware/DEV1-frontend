import { useMutation } from '@tanstack/react-query'
import { addRole } from '@/apis/rolesApi'
import { roleName } from '@/types/roleTypes'

export const useCreateRole = () => {
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (role: roleName) => addRole(role),
  })

  return { mutate, isPending, isError, isSuccess, error, data }
}
