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
    console.log(token)
    console.log(password)
    if (token && password) {
      console.log('inside if')
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
      <div className="p-8 rounded-lg border shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h2>
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Label htmlFor="email">New Password</Label>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your new password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-10 cursor-pointer"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full mt-6 py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition"
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

          {isError && <p className="text-red-500 mt-4 text-center">{error}</p>}
          {passwordError && (
            <p className="text-red-500 mt-4 text-center">{passwordError}</p>
          )}
          {successMessage && (
            <p className="text-green-500 mt-4 text-center">{successMessage}</p>
          )}

          <Link
            to="/login"
            className="mt-5 text-center block text-blue-500 hover:underline"
          >
            Remember your password? Login here
          </Link>
        </div>
      </div>
    </div>
  )
}
