import { useQuery } from '@tanstack/react-query';
import { getUser } from '../apis/getuserAPI';
import { User } from '../types/loginType';

export const useGetUsers = (userId: string) => {
  const { isLoading, data, isError, error } = useQuery<User, Error>({
    queryKey: ['user', userId],  
    queryFn: () => getUser(userId),  
    enabled: !!userId,  
  });

  return { isLoading, data, isError, error };
};
