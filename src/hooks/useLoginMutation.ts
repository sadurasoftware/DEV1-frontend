import { useMutation } from '@tanstack/react-query'
import { loginUser } from '@/apis/authApi'
import { LoginUser, ErrorResponse } from '@/types/loginType'
import axios, { AxiosError } from 'axios'
// import useThemeStore from '../store/themeStore';

export const useLoginMutation = () => {
  // const { setTheme } = useThemeStore();
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (user: LoginUser) => loginUser(user),
    onSuccess: data => {
      console.log('User Logged in:', data)

      // const userTheme = data.theme || 'light';
      // setTheme(userTheme);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        console.error(
          error.response?.data.message || 'An unexpected error occurred'
        )
      } else {
        console.error('An unexpected error occurred.')
      }
    },
  })

  return { mutate, isPending, isError, isSuccess, error, data }
}
