import { ErrorResponse } from '@/types/loginType'
import { useMutation } from '@tanstack/react-query'
import { deleteUser } from '../apis/usersFetchApi'
import { ApiResponse } from '../types/registerTypes'

export const useDeleteUserById = () => {
  const {
    mutate: deleteUserMutation,
    isError: isUserError,
    error: userError,
    isPending: deleteUserPending,
  } = useMutation<ApiResponse, ErrorResponse, number>({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      console.log('User deleted successfully')
      //   refetch()
    },
    onError: (error: ErrorResponse) => {
      console.error('Error deleting user:', error)
    },
  })

  return {
    deleteUser: deleteUserMutation,
    isUserError,
    userError,
    deleteUserPending,
  }
}
