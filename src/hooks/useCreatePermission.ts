import { useMutation } from '@tanstack/react-query'
import { permissionName } from '@/types/permissionsTypes'
import { addPermission } from '@/apis/permissionAPI'

export const useCreatePermission = () => {
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (permission: permissionName) => addPermission(permission),
  })

  return { mutate, isPending, isError, isSuccess, error, data }
}
