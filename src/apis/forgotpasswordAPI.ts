import axios from 'axios';
import { ApiResponse } from '../types/registerTypes'; 

export const forgotPassword = async (email: string): Promise<ApiResponse> => {
  const response = await axios.post<ApiResponse>('http://localhost:3000/api/auth/forget-password', { email });
  return response.data;
};
