import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForgotPasswordMutation } from '../hooks/useForgotPassword'

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('')
  const { mutate, isError, error, successMessage } = useForgotPasswordMutation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(email)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 rounded-lg border  m-auto mt-3 mb-3 bg-white dark:bg-black">
        <h2 className="text-2xl font-semibold  mb-6 dark:text-cust-green">
          Forgot Password
        </h2>
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
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
                required
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
            {isError && <p className="text-red-500 text-sm mt-4 ">{error}</p>}
            {successMessage && (
              <p className="text-green-500 mt-4 ">{successMessage}</p>
            )}
            <Button
              type="submit"
              className="w-full mt-6 py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
            >
              Send Reset Link
            </Button>
          </form>
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
