import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { useForgotPasswordMutation } from "../hooks/useForgotPassword"
import { Link } from "react-router-dom"

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("")
  const { mutate, isError, error, successMessage } = useForgotPasswordMutation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate(email)
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='p-8 rounded-lg border shadow-lg w-full max-w-xl'>
        <h2 className='text-2xl font-semibold text-center mb-6'>
          Forgot Password
        </h2>
        <div className='space-y-4'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input
                type='email'
                id='email'
                name='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <Button
              type='submit'
              className='w-full mt-6 py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition'>
              Send Reset Link
            </Button>
          </form>

          {isError && <p className='text-red-500 mt-4 text-center'>{error}</p>}
          {successMessage && (
            <p className='text-green-500 mt-4 text-center'>{successMessage}</p>
          )}

          <Link
            to='/login'
            className='mt-5 text-center block text-blue-500 hover:underline'>
            Remember your password? Login here
          </Link>
        </div>
      </div>
    </div>
  )
}
