import React, { useState } from 'react';
import { useForgotPasswordMutation } from '../hooks/useForgotPassword';
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const { mutate, isError, error, successMessage } = useForgotPasswordMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(email); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-center mb-6">Forgot Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">
           Send Reset Link
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
