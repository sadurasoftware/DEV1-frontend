import React, { useState } from 'react';
import axios, { AxiosError } from 'axios'; 
import { useRegisterMutation } from '../hooks/useRegister';
import { RegisterRequest } from '../types/registerTypes';
import { registerValidation } from '../validation/registerValidation';
import { z } from 'zod';

const RegisterForm: React.FC = () => {
  const { mutate, error, isSuccess } = useRegisterMutation();
  const [formData, setFormData] = useState<RegisterRequest>({
    username: '',
    email: '',
    password: '',
    terms: false,
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form using Zod
    try {
      registerValidation.parse(formData);   // This will throw an error if validation fails
      mutate(formData);     // If validation passes, send data to the backend
      setFormErrors({}); 

      
      // Make a POST request to the backend using axios
      try {
        const response = await axios.post('http://localhost:5000/api/register', formData);
        console.log(response.data); 
        setFormErrors({});  // Clear previous errors if registration is successful
      } 
      catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error('Error during registration:', error.response?.data || error.message);
        }
      }
    } catch (err) {
      // If validation fails, display the validation errors
      if (err instanceof z.ZodError) {
        const errors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          errors[error.path[0]] = error.message;
        });
        setFormErrors(errors);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col">
      <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
        <div>
          <label htmlFor="username">Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {formErrors.username && <p className="text-red-500 text-sm">{formErrors.username}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
           
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <label>
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="h-5 w-5"
            />
            I accept the Terms and Conditions
          </label>
          {formErrors.terms && <p className="text-red-500 text-sm">{formErrors.terms}</p>}
        </div>

        <div className="text-center mt-4">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md
              hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={!formData.terms}
          >
           Register
          </button>
        </div>
      </form>

      {isSuccess && <p className="success-message">Registration successful!</p>}
      {error && <p className="error-message">Something went wrong, please try again.</p>}
    </div>
  );
};

export default RegisterForm;
