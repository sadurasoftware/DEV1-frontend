import { useLoginInfoStore } from '../store/useLoginInfoStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetUsers } from '../hooks/useGetUser';

export const UserDashboard = () => {
  const { token, user } = useLoginInfoStore();
  const userId = user?.id ? user.id.toString() : ''; 
  const { isLoading, data, isError, error } = useGetUsers(userId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);


  const handleEditClick = () => {
    navigate(`/edit-profile/${userId}`);
  };


  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-center text-3xl font-semibold mb-6">Welcome to Your Dashboard</h1>

      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full h-10 w-10"></div>
        </div>
      )}

      {isError && <p className="text-center text-red-500">{`Error loading user details: ${error?.message}`}</p>}

      {data && (
        <div className="flex justify-center">
          <div className="max-w-md w-full">
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              {/* <h5 className="text-xl font-bold text-center text-gray-800">Name: {data.username}</h5>
              <h6 className="text-lg font-semibold text-center text-gray-500">Email: {data.email}</h6> */}
              <p className="text-center mt-4 text-lg font-semibold text-gray-500">
                <span className="font-bold">Name:</span> {data.username}
              </p>
              <p className="text-center mt-4 text-lg font-semibold text-gray-500">
                <span className="font-bold">Email:</span> {data.email}
              </p>
              <p className="text-center mt-4 text-lg font-semibold text-gray-500">
                <span className="font-bold">Status:</span> {data.isVerified ? 'Verified' : 'Registered'}
              </p>


              <div className="flex justify-center mt-6">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};