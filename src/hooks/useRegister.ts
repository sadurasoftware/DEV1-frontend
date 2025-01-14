import { useMutation } from '@tanstack/react-query';
import { RegisterRequest, RegisterResponse, ErrorResponse } from '../types/registerTypes';
import { registerUser } from '../apis/registerAPI';
import axios, { AxiosError } from 'axios';


// Define the hook for register mutation
export const useRegisterMutation = () => {
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (user: RegisterRequest) => registerUser(user), 
    onSuccess: (data: RegisterResponse) => {
    
      console.log("User Registered:", data);
      // localStorage.setItem("token", data.message);  
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
