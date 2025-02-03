import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../apis/fetchuserAPI';
import { User } from '../types/loginType';

export const useFetchUser = (userId: number) => {
  const { isLoading, data, isError, error } = useQuery<User, Error>({
    queryKey: ['user', userId],  
    queryFn: () => fetchUser(userId), 
    enabled: !!userId, 
  });

  return { isLoading, data, isError, error };
};
