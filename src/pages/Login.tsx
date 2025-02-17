import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLoginMutation } from '@/hooks/useLoginMutation'
import { LoginUser } from '@/types/loginType'
import { loginschema } from '@/validation/validator'
import { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useLoginInfoStore } from '../store/useLoginInfoStore'

export const Login = () => {
  // Get from store
  const setLoginInfo = useLoginInfoStore(state => state.setLoginInfo)

  const [user, setUser] = useState<LoginUser>({ email: '', password: '' })
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }))

    setError('')
  }

  // Mutation
  const {
    mutate,
    isPending,
    isError,
    isSuccess,
    error: mutationError,
    data,
  } = useLoginMutation()

  useEffect(() => {
    if (isSuccess && data) {
      setSuccess(data.user.username)
      //sending store data
      setLoginInfo(data?.token, data?.user)
      setError('')
      setUser({ email: '', password: '' })
      if (data?.user?.roleId === 1) {
        navigate('/super-admin')
      } else if (data?.user?.roleId === 2) {
        navigate('/admindashboard')
      } else {
        navigate('/userdashboard')
      }
    }

    if (isError && mutationError) {
      setError(
        mutationError.response?.data.message || 'An unexpected error occurred.'
      )
      setSuccess('')
    }
  }, [isSuccess, isError, data, mutationError])

  // Handle login action
  const handleLogin = () => {
    try {
      loginschema.parse(user)

      mutate(user)
    } catch (err) {
      if (err instanceof z.ZodError) {
        // If validation fails, show the first error message
        setError(err.errors[0]?.message || 'Invalid input')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg border shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={user.email}
            />
          </div>
          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={user.password}
            />

            <span
              className="absolute right-3 top-10 cursor-pointer"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <Button
            onClick={handleLogin}
            className="w-full mt-6 py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition"
          >
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          {success && (
            <p className="text-green-500 mt-4 text-center">{success}</p>
          )}
          <div>
            <Link to="/register">New User? Register here</Link>
          </div>
          <Button
            onClick={() => navigate('/forget-password')}
            className="w-full mt-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition"
          >
            Forgot Password
          </Button>

          {/* <button
          onClick={handleLogin}
          className="w-full mt-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          {isPending ? 'Logging in...' : 'Login'}
        </button> */}

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          {success && (
            <p className="text-green-500 mt-4 text-center">{success}</p>
          )}
        </div>
      </div>
    </div>
  )
}
