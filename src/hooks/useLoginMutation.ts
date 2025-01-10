import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/apis/authApi"; 
import { LoginUser, ErrorResponse } from "@/types/loginType";
import axios, { AxiosError } from "axios";
 

export const useLoginMutation = () => {
  
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (user: LoginUser) => loginUser(user), 
    onSuccess: (data) => {
      console.log("User Logged in:", data);
    //   localStorage.setItem("token", data.data); 
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
