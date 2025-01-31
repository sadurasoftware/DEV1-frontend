// hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import { fetchAdmins } from '../apis/adminsFetchApi';
import { User } from '../types/loginType';

export const useFetchAdmins = () => {
  const { isLoading:adminLoading, data:admins, isError:isAdminsError, error:adminsError } = useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchAdmins,
  });

  return { adminLoading, admins, isAdminsError, adminsError };
};
