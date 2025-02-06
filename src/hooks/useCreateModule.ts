import { useMutation } from "@tanstack/react-query";
import { addModule } from "@/apis/modulesApi"; 
import { moduleName } from "@/types/moduleTypes";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "@/types/registerTypes";

export const useCreateModule = () => {
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (module: moduleName) => addModule(module), 
    onSuccess: (data) => {
      console.log("Module added:", data);
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
