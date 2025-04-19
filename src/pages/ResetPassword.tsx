import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { useResetPasswordMutation } from '../hooks/useResetPassword'
import { passwordValidation } from '../validation/passwordValidation'

export const ResetPassword = () => {
  const [password, setPassword] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const { mutate, isError, error, successMessage } = useResetPasswordMutation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (token && password) {
      try {
        passwordValidation.parse({ password })
        setPasswordError('')
        mutate({ password, token })
      } catch (err) {
        if (err instanceof z.ZodError) {
          setPasswordError(err.errors[0]?.message || 'Invalid input')
        }
      }
    } else {
      setPasswordError('Token or password is missing')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 rounded-lg border  m-auto mt-3 mb-3 bg-white dark:bg-black">
        <h2 className="text-2xl font-semibold  mb-6 dark:text-cuts-green">
          Reset Password
        </h2>
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Label htmlFor="email" className="label">
                New Password
              </Label>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your new password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              
              />
              <span
                className="absolute right-3 top-10 cursor-pointer"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {isError && <p className="text-error-red text-xs mt-4 ">{error}</p>}
            {passwordError && (
              <p className="text-error-red text-xs mt-4 ">{passwordError}</p>
            )}
            {successMessage && (
              <p className="text-success-green text-xs mt-4 ">
                {successMessage}
              </p>
            )}
            <div>
              <Button
                type="submit"
                className="w-full mt-6 py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
              >
                Reset password
              </Button>
            </div>
            {/*  <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">
           Reset password
          </button>*/}
          </form>
          <div className="pt-5 text-xs">
            <Link to="/login" className="text-xs pt-5">
              Remember your password?{' '}
              <span className="hover:underline">Login here</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
