import { ModeToggle } from '@/components/mode-toggle'
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
      setSuccess(data.user.firstname + ' ' + data.user.lastname)
      
      setLoginInfo(data?.token, data?.user)
      setError('')
      console.log('Inside login page..')
      console.log(`RoleId:${data?.user?.roleId}`)
      if (data?.user) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
      
      setUser({ email: '', password: '' })
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
    <>
      <ModeToggle />
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full p-8 rounded-lg border  m-auto mt-3 mb-3 bg-white dark:bg-black">
          <h2 className="text-2xl font-semibold  mb-6 dark:text-cust-green">
            Login
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-xs font-medium">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={user.email}
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-xs font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={user.password}
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            {error && <p className="text-error-red text-xs mt-4 ">{error}</p>}
            {success && (
              <p className="text-success-green text-xs mt-4 ">{success}</p>
            )}
            <Button
              onClick={handleLogin}
              className="w-full mt-6 py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
            >
              {isPending ? 'Logging in...' : 'Login'}
            </Button>

            {/* <Button
              onClick={() => navigate('/forget-password')}
              className="w-full mt-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition"
            >
              Forgot Password?
            </Button> */}
          </div>
          <div className="pt-5 flex flex-col justify-between text-xs md:flex-row">
            <Link to="/register" className="whitespace-pre">
              New User? <span className="hover:underline">Register here</span>
            </Link>
            <Link to="/forget-password" className="whitespace-pre">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
