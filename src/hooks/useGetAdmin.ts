import { useQuery } from '@tanstack/react-query';
import { getAdmin } from '../apis/getadminAPI';
import { User } from '../types/loginType';

export const useGetAdmin = (userId: string) => {
  const { isLoading, data, isError, error } = useQuery<User, Error>({
    queryKey: ['user', userId],  
    queryFn: () => getAdmin(userId),  
    enabled: !!userId,  
  });

  return { isLoading, data, isError, error };
};
