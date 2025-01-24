import axios from 'axios';
import { User, ApiResponse } from '../types/registerTypes';

export const registerUser = async (data: User): Promise<ApiResponse> => {
  const response = await axios.post<ApiResponse>('http://localhost:3000/api/auth/register', data);
  return response.data;
};
