// hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import { fetchRoles } from '../apis/roleFetchApi';
import { rolesResponse } from '../types/rolePermissionTypes';

export const useFetchRoles = () => {
    const { isLoading: rolesLoading, data:rolesData, isError: isRolesError, error: rolesError, refetch } = useQuery<rolesResponse>({
      queryKey: ['roles'],
      queryFn: fetchRoles,
    });
  
    return { rolesLoading, rolesData, isRolesError, rolesError, refetch };
  };
  
  
