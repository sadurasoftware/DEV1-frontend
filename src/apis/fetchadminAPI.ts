import axios from 'axios';
import { User } from '../types/loginType';

export const fetchAdmin = async (userId: number): Promise<User> => {
    try {
      const response = await axios.get(`http://localhost:3000/api/admin/${userId}`);
      return response.data;
    } 
    catch (error) {
      console.error('Error updating admin:', error);
      throw error;
    }
};
