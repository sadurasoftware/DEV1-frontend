import { RoleModulePermissionFetch } from '@/apis/fetchRoleModulePermissions'
import { RoleModulePermission } from '@/types/roleModulePermissionType'
import { useQuery } from '@tanstack/react-query'

export const useFetchRoleModulePermission = (roleId: number) => {
  const {
    isLoading: modulePermissionLoading,
    data: modulePermissionData,
    isError: isModulePermissionError,
    error: modulePermissionError,
    refetch,
  } = useQuery<RoleModulePermission>({
    queryKey: ['modulePermission', roleId],
    queryFn: () => RoleModulePermissionFetch(roleId),
  })

  return {
    modulePermissionLoading,
    modulePermissionData,
    isModulePermissionError,
    modulePermissionError,
    refetch,
  }
}
