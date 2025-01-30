// hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../apis/usersFetchApi';
import { User } from '../types/loginType';

export const useFetchUsers = () => {
  const { isLoading, data, isError, error } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return { isLoading, data, isError, error };
};
