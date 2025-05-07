import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForgotPasswordMutation } from '../hooks/useForgotPassword'
import { emailValidation } from '@/validation/emailValidation'
import { z } from 'zod'
// import { AxiosError } from 'axios'

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('')
  const { mutate, isError, isSuccess, error, isPending } = useForgotPasswordMutation()
  const [emailError, setEmailError] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      emailValidation.parse({ email })
      setEmailError('')
      mutate(email)
    } catch (err) {
      if (err instanceof z.ZodError) {
        setEmailError(err.errors[0]?.message || 'Invalid input')
      }
    }

  }

  useEffect(()=>{
    if(isError)
      {
        setEmailError(error?.response?.data?.error || 'Invalid input')
      }
      else
      {
        setEmailError('')
      }
  },[isError])
  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 rounded-lg border  m-auto mt-3 mb-3 bg-white dark:bg-black">
        <h2 className="text-2xl font-semibold  mb-6 dark:text-cust-green">
          Forgot Password
        </h2>
        <div className="space-y-4">

          <div>
            <Label htmlFor="email" className="label">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          {/* <div>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div> */}

          {emailError && (
            <p className="text-error-red text-xs mt-4">{emailError}</p>
          )}

          {/* {isError && (
            <p className="text-error-red text-xs mt-4">
              {(error instanceof AxiosError)
                ? (error.response?.data?.error || error.response?.data?.error.message)
                : 'Forgot password error'}
            </p>
          )} */}



          {isSuccess && (
            <p className="text-success-green text-xs mt-4">{'Password reset sucessfully sent to your email address. Check your inbox or spam folder for the reset link.'}</p>
          )}



          <Button
            onClick={handleSubmit}
            className="w-full mt-6 py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
          >
            {isPending ? 'Sending Reset Link...': 'Send Reset Link'}
          </Button>

          <div className="pt-5 text-xs">
            <Link to="/login">
              Remember your password?
              <span className="hover:underline"> Login here</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
