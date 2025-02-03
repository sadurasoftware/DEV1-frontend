import { useQuery } from '@tanstack/react-query';
import { fetchPermissions } from '../apis/permissionFetchAPI';
import { permissionsResponse } from '../types/permissionsTypes';

export const useFetchPermissions = () => {
    const { isLoading: permissionsLoading, data:permissionsData, isError: isPermissionsError, error: permissionsError, refetch } = useQuery<permissionsResponse>({
      queryKey: ['permissions'],
      queryFn: fetchPermissions,
    });
  
    return { permissionsLoading, permissionsData, isPermissionsError, permissionsError, refetch };
  };
  
  
