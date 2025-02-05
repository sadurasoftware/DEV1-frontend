import axios from 'axios';
import { GetAdminResponse } from '../types/loginType';

export const getAdmin = async (userId: number): Promise<GetAdminResponse> => {
  try {
    const response = await axios.get(`http://localhost:3000/api/admin/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching admin:', error);
    throw error;
  }
};