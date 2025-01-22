import { useLoginInfoStore } from '../store/useLoginInfoStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Dashboard = () => {
  const { token, username } = useLoginInfoStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login"); 
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>Dashboard page</h1>
      {token && <h1>Welcome, {username}</h1>}
    </div>
  );
};
