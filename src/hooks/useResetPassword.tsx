import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../apis/resetpasswordAPI';
import { ErrorResponse } from '../types/loginType';
import { AxiosError } from 'axios';
import { useState } from 'react';

export const useResetPasswordMutation = () => {
  const [error, setError] = useState<string>(''); 
  const [successMessage, setSuccessMessage] = useState<string>(''); 
  
  const { mutate, isPending, isError, isSuccess, data } = useMutation({
    mutationFn: ({ password, token }: { password: string, token: string }) => resetPassword(password, token),
    onSuccess: (data) => {
      console.log('Password reset successfully:', data);
      setSuccessMessage('Password reset successfully');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        setError(error.response?.data.message || 'An unexpected error occurred');
      }
       else {
        setError('An unexpected error occurred.');
      }
    },
  });

  return { mutate, isPending, isError, isSuccess, successMessage, error, data };
};
