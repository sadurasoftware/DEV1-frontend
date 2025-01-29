import React, { useState, useEffect } from 'react';
import { useRegisterMutation } from '../hooks/useRegister'; 
import { User } from '../types/registerTypes';
import { registerValidation } from '../validation/registerValidation';
import { z } from 'zod';
import useThemeStore from '../store/themeStore';
import { PasswordType } from '../types/registerTypes';
import { useLoginInfoStore } from '@/store/useLoginInfoStore';

const RegisterForm: React.FC = () => {
  const { theme } = useThemeStore(); 
  const { token, user } = useLoginInfoStore();
  const [formData, setFormData] = useState<User>({
    id: 0, 
    username: '',
    email: '',
    password: '',
    role:'user',
  });

  const [passwordCondition, setPasswordCondition] = useState<PasswordType>({
    minLength:false,
    maxLength: false,
    hasUpperCase: false,
    hasSpecialChar: false,
    hasNumber:false
  })

  const validatedPassword = (password:string) =>{
    setPasswordCondition({
      minLength : password.length >= 6,
      maxLength : password.length <= 20,
      hasUpperCase : /[A-Z]/.test(password),
      hasNumber : /[0-9]/.test(password),
      hasSpecialChar : /[^A-Za-z0-9]/.test(password)
    })
  }

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const { mutate, isError, isSuccess, error } = useRegisterMutation();

  const isSuperAdmin = user?.roleId === 1;
 
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
    }));
  }, [theme]);


  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target; 
      if(name == 'password')
      {
        validatedPassword(value)
      }

    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({}); 
    setApiError(null); 
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({}); // Clear previous errors
    setApiError(null); 

    if (!isSuperAdmin) {
      setFormData(prevData => ({
        ...prevData,
        role: 'user' 
      }));
    }

    // Validate form using Zod
    try {
      registerValidation.parse(formData); 
      mutate(formData, {
        onSuccess: () => {
          // Reset form data on success
          setFormData({
            id: 0,
            username: '',
            email: '',
            password: '',
            role:'user'
          });
        },
        onError: (err) => {
          if (err && err.response && err.response.data) {
            setApiError(err.response.data.message); 
          }
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


  const formStyles = theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white';
  const labelStyles = theme === 'light' ? 'text-black' : 'text-white';
  const inputStyles = theme === 'light' ? 'border-gray-300 text-black' : 'border-gray-600 text-white bg-gray-700';

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
          {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
            
            {/* <p>Password must be 6-20 characters long, include at least one uppercase letter, one number, and one special character.</p> */}
            
            <p style={{ color: passwordCondition.minLength ? 'green' : 'red' }}>
              {passwordCondition.minLength ? '✔' : '❌'} At least 6 characters
            </p>
            <p style={{ color: passwordCondition.maxLength ? 'green' : 'red' }}>
              {passwordCondition.maxLength ? '✔' : '❌'} Maximum 20 characters
            </p>
            <p style={{ color: passwordCondition.hasUpperCase ? 'green' : 'red' }}>
              {passwordCondition.hasUpperCase ? '✔' : '❌'} Contains at least one uppercase letter
            </p>
            <p style={{ color: passwordCondition.hasNumber ? 'green' : 'red' }}>
              {passwordCondition.hasNumber ? '✔' : '❌'} Contains at least one number
            </p>
            <p style={{ color: passwordCondition.hasSpecialChar ? 'green' : 'red' }}>
              {passwordCondition.hasSpecialChar ? '✔' : '❌'} Contains at least one special character
            </p>
          
        </div>

        {isSuperAdmin &&  (
          <div>
            <label htmlFor="role" className={labelStyles}>Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full p-3 border ${inputStyles} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="superadmin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            {formErrors.role && <p className="text-red-500 text-sm">{formErrors.role}</p>}
          </div>
        )}

        <div className="text-center mt-4">
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </form>

      {isSuccess && <p className="text-green-500 text-center mt-4">Registration successful! Please check your email for verification.</p>}
      {isError && apiError && <p className="text-red-500 text-center mt-4">{apiError}</p>}
    </div>
  );
};

export default RegisterForm;