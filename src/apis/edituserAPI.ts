import axios from 'axios';
import { UpdateUserData } from '../types/edituserTypes';

export const updateUser = async (userId: string, data: UpdateUserData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/users/${userId}`, data);
      return response.data;
    } 
    catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
};
