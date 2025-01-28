import axios from 'axios';
import { PermissionTemplateAdmin } from '../types/permissionTemplate';
import { ApiResponse } from '../types/registerTypes'; 

export const createPermissionTemplate  = async (data: PermissionTemplateAdmin): Promise<ApiResponse> => {
  const response = await axios.post<ApiResponse>('http://localhost:3000/api/auth/permissions', data);
  return response.data;
};
