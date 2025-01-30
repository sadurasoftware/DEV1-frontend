import axios from 'axios';
import { User } from '../types/loginType';

export const fetchAdmins = async (): Promise<User[]> => {
  try {
    const response = await axios.get('http://localhost:3000/api/super-admin/admins');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
