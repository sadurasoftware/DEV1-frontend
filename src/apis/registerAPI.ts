import axios from 'axios';
import { RegisterRequest, RegisterResponse } from '../types/registerTypes';

export const registerUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>('http://localhost:5000/api/register', data);
  return response.data;
};
