import { useEffect, useState } from 'react';
import { useLoginInfoStore } from '../store/useLoginInfoStore';
import { useNavigate } from 'react-router-dom';
import { updateAdmin } from '../apis/editadminAPI';
import { useGetAdmin } from '../hooks/useGetAdmin';

export const EditAdminProfile = () => {
  const { user } = useLoginInfoStore();
  const userId = user?.id || 0; 
  const navigate = useNavigate();

  const { data, isLoading, error: fetchError } = useGetAdmin(userId);

  const { userData } = data || {}; 

  const [formData, setFormData] = useState({
    username: userData?.username || '',
    email: userData?.email || '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (userData) {
   
      setFormData({
        username: userData.username,
        email: userData.email,
      });
    }
    
  }, [userData]);
  console.log(userData)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !formData) {
      return;
    }

    try {
      await updateAdmin(userId, {
        username: formData.username,
        email: formData.email,
      });

      navigate('/admindashboard');
    } catch (err) {
      console.error('Error updating profile', err);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (fetchError) {
    return <div className="text-center text-red-500">Error fetching user data</div>;
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-center text-3xl font-semibold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
            Name
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};
