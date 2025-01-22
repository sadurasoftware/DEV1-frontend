import React, { useState, useEffect } from 'react';
import { useRegisterMutation } from '../hooks/useRegister'; 
import { RegisterRequest } from '../types/registerTypes';
import { registerValidation } from '../validation/registerValidation';
import { z } from 'zod';
import useThemeStore from '../store/themeStore';


const RegisterForm: React.FC = () => {
  const { theme } = useThemeStore(); 
  const [formData, setFormData] = useState<RegisterRequest>({
    username: '',
    email: '',
    password: '',
    terms: false,
    theme: theme,
  });

 
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const { mutate, isError, isSuccess, error } = useRegisterMutation();


    // to update theme in formData when it changes in Zustand store
    useEffect(() => {
      setFormData((prevData) => ({
        ...prevData,
        theme: theme, 
      }));
    }, [theme]);


  // Handle input change 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setFormErrors({}); 
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});   // Clear previous errors
    console.log(formData);


    // Validate form using Zod
    try {
      registerValidation.parse(formData); 
      mutate(formData, {
        onSuccess: () => {
          // Reset form data on sucess
          setFormData({
            username: '',
            email: '',
            password: '',
            terms: false,
            theme: theme,
          });
        },
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          errors[error.path[0]] = error.message;
        });
        setFormErrors(errors);
      }
    }
  };


  const formStyles = theme === 'light'
   ? 'bg-white text-black' : 'bg-gray-800 text-white';
  const labelStyles = theme === 'light'
   ? 'text-black' : 'text-white';
  const inputStyles = theme === 'light'
   ? 'border-gray-300 text-black' : 'border-gray-600 text-white bg-gray-700';

  return (
    <div className={`max-w-lg mx-auto p-6 rounded-lg shadow-md flex flex-col ${formStyles}`}>
      <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

      <form onSubmit={handleSubmit} className="space-y-4 flex-grow">
        <div>
          <label htmlFor="username" className={labelStyles}>Name</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full p-3 border ${inputStyles} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {formErrors.username && <p className="text-red-500 text-sm">{formErrors.username}</p>}
        </div>

        <div>
          <label htmlFor="email" className={labelStyles}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 border ${inputStyles} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className={labelStyles}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 border ${inputStyles} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <label className={labelStyles}>
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
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </form>

      {isSuccess && <p className="text-green-500 text-center mt-4">Registration successful..! Please check your email for verification.</p>}
      {isError && <p className="text-red-500 text-center mt-4">Something went wrong, please try again.</p>}

    </div>

    
  );
};

export default RegisterForm;