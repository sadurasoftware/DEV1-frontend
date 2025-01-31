import { useState, useEffect } from 'react';
import { useLoginInfoStore } from '../store/useLoginInfoStore';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../apis/edituserAPI';

export const EditUserProfile = () => {
  const { user } = useLoginInfoStore();
  const { userId } = useParams();  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: '', email: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  
    if (user?.id === Number(userId)) {
      setFormData({
        username: user.username,
        email: user.email
      });
    } else {
      navigate('/login');  
    }
  }, [user, userId, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);  

    if (!userId) {
      setError("Invalid user ID");
      return;
    }

    setIsLoading(true);
    try {
      await updateUser(userId, formData);  
      setIsLoading(false);
      navigate(`/userdashboard`);  
    } catch (err) {
      setIsLoading(false);
      setError('Error updating profile');
    }
  };

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
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
      </form>  
    </div>
  );
};
