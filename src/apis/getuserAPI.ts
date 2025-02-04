import axios from 'axios';
import { GetUserResponse } from '../types/loginType';

export const getUser = async (userId: number): Promise<GetUserResponse> => {
  try {
    const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
