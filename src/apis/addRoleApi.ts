import axios, { AxiosResponse } from "axios";
import { roleType } from "@/types/rolePermissionTypes";

export const addRole = async (role: roleType): Promise<roleType> => {
  const res: AxiosResponse = await axios.post("http://localhost:3000/api/roles/create", {
    name: role.name 
  });

  if (!res) {
    throw new Error("Error fetching API");
  }
  return res.data;
};
