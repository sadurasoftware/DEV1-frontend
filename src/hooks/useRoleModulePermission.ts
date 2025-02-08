import { useMutation } from "@tanstack/react-query";
import { RoleModulePermission } from "@/types/roleModulePermissionType";
import { ErrorResponse } from "@/types/loginType";
import axios, { AxiosError } from "axios";
import { RoleModulePermissionCreate } from "@/apis/roleModulePermissionStoreApi";

export const useRoleModulePermissionMutation = () => {
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: (roleModulePermission: RoleModulePermission) => RoleModulePermissionCreate(roleModulePermission), 
    onSuccess: (data) => {
      console.log("Module with Permissions creates successfully:", data);
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
