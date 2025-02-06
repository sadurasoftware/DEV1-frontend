import { useQuery } from '@tanstack/react-query';
import { fetchModules } from '../apis/modulesApi';
import { modulesResponse } from '../types/moduleTypes';

export const useFetchModules = () => {
    const { isLoading: modulesLoading, data:modulesData, isError: isModulesError, error: modulesError, refetch } = useQuery<modulesResponse>({
      queryKey: ['modules'],
      queryFn: fetchModules,
    });
  
    return { modulesLoading, modulesData, isModulesError, modulesError, refetch };
  };
  
  
