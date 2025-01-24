import React, { useState } from 'react';
import { useResetPasswordMutation } from '../hooks/useResetPassword';
import { Link } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';

export const ResetPassword = () => {
  const [password, setPassword] = useState<string>('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); 
  const { mutate, isError, error, successMessage } = useResetPasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token && password) {
        mutate({ password, token }); 
      } else {
        console.error("Token or password is missing");
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-center mb-6">Reset Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">
           Reset password
          </button>
        </form>

        {isError && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 mt-4 text-center">{successMessage}</p>}

        <Link to="/login" className="mt-5 text-center block text-blue-500 hover:underline">
          Remember your password? Login here
        </Link>
      </div>
    </div>
  );
}; 
