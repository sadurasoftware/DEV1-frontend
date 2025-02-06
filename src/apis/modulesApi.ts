import axios, { AxiosResponse } from "axios";
import { moduleName, modulesResponse } from "@/types/moduleTypes";

export const fetchModules = async (): Promise<modulesResponse> => {
    try {
      const response = await axios.get('http://localhost:3000/api/modules/get');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
};

export const addModule = async (role: moduleName): Promise<modulesResponse> => {  
  const res: AxiosResponse<modulesResponse> = await axios.post("http://localhost:3000/api/modules/create", {
    name: role.name,
  });

  if (!res || !res.data) {
    throw new Error("Error fetching API");
  }

  return res.data;
};


export const deleteModuleById = async (id: number): Promise<modulesResponse> => {
  const res: AxiosResponse<modulesResponse> = await axios.delete(`http://localhost:3000/api/modules/delete/${id}`);
  if (res.status !== 200) {
    throw new Error("Error deleting role");
  }
  return res.data; 
};

export const updateModule = async (id: number, name: string ): Promise<modulesResponse> => {
  try {
    const response = await axios.put(`http://localhost:3000/api/modules/update/${id}`, {name}); 
    return response.data;  
  } catch (error) {
    throw error;  
  }
};
