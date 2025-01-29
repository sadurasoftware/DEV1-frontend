import { useLoginInfoStore } from '../store/useLoginInfoStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useFetchUsers } from '@/hooks/useFetchUsers'; // Import your custom hook

export const SuperAdminDashboard = () => {
  const { token, user } = useLoginInfoStore();
  const navigate = useNavigate();

  // Call the custom hook to fetch users
  const { isLoading, data, isError, error } = useFetchUsers();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>Super admin Dashboard page</h1>
      {token && <h1>Welcome, {user?.username}</h1>}

      {/* Display users or loading state */}
      {isLoading && <p>Loading users...</p>}
      {isError && <p>Error loading users: {error?.message}</p>}

      {/* Display user data in a table if available */}
      {data && (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.isVerified ? 'Verified' : 'Registered'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
