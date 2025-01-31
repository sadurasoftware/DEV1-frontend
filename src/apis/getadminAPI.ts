import axios from 'axios';
import { User } from '../types/loginType';

export const getAdmin = async (userId: string): Promise<User> => {
  try {
    const response = await axios.get(`http://localhost:3000/api/admin/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
