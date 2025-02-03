import axios, { AxiosResponse } from "axios";
import { permissionName, permissionsResponse } from "@/types/permissionsTypes";

export const addPermission = async (permission: permissionName): Promise<permissionsResponse> => {
  
  const res: AxiosResponse<permissionsResponse> = await axios.post("http://localhost:3000/api/permissions/create", {
    name: permission.name,
  });

  if (!res || !res.data) {
    throw new Error("Error fetching API");
  }

  return res.data;
};


export const deletePermissionById = async (id: number): Promise<permissionsResponse> => {
  const res: AxiosResponse<permissionsResponse> = await axios.delete(`http://localhost:3000/api/permissions/delete/${id}`);
  if (res.status !== 200) {
    throw new Error("Error deleting permission");
  }
  return res.data; 
};




export const updatePermission = async (id: number, name: string ): Promise<permissionsResponse> => {
  try {
    const response = await axios.put(`http://localhost:3000/api/permissions/update/${id}`, {name}); 
    return response.data;  
  } catch (error) {
    throw error;  
  }
};
