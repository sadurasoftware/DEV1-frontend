import { useMutation } from '@tanstack/react-query';
import { User, ApiResponse, ErrorResponse } from '../types/registerTypes';
import { registerUser } from '../apis/registerAPI';
import axios, { AxiosError } from 'axios';
// import useThemeStore from '../store/themeStore';


// Define the hook for register mutation
export const useRegisterMutation = () => {
  // const { setTheme } = useThemeStore();
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (user: User) => registerUser(user), 
    onSuccess: (data: ApiResponse) => {
      console.log("User Registered:", data);
       
      // const userTheme = data.theme || 'light';
      // setTheme(userTheme);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message || "An unexpected error occurred");
      } else {
        console.error("An unexpected error occurred.");
      }
    },
  });

  return { mutate, isPending, isError, isSuccess, error, data };
};
