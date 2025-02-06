import axios from 'axios';
import { UpdateAdminData } from '../types/editadminTypes';

export const updateAdmin = async (userId: number, data: UpdateAdminData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/admin/${userId}`, data);
      return response.data;
    } 
    catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
};
