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
  // Get from store ---
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
        navigate('/dashboard')
      } else {
        navigate('/login')
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
      <div className="min-h-screen flex items-center justify-center flex-col">
        <div className="mb-5">
          <svg
            width="164"
            height="47"
            viewBox="0 0 164 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="dark:fill-[#00F27E] fill-[#005eff]"
          >
            <path d="M17.5189 26.6C17.5189 25.5333 17.1189 24.6667 16.3189 24C15.5523 23.3333 14.5689 22.7333 13.3689 22.2C12.2023 21.6333 10.9189 21.0667 9.51895 20.5C8.15228 19.9 6.86895 19.1833 5.66895 18.35C4.50228 17.4833 3.51895 16.4167 2.71895 15.15C1.95228 13.8833 1.56895 12.2667 1.56895 10.3C1.56895 8.6 1.85228 7.13333 2.41895 5.9C2.98561 4.63333 3.78561 3.58333 4.81895 2.75C5.88561 1.91666 7.13561 1.3 8.56895 0.899999C10.0023 0.499998 11.6023 0.299998 13.3689 0.299998C15.4023 0.299998 17.3189 0.483332 19.1189 0.85C20.9189 1.18333 22.4023 1.68333 23.5689 2.35L21.4189 8.1C20.6856 7.63333 19.5856 7.21667 18.1189 6.85C16.6523 6.45 15.0689 6.25 13.3689 6.25C11.7689 6.25 10.5356 6.56667 9.66895 7.2C8.83561 7.83333 8.41895 8.68333 8.41895 9.75C8.41895 10.75 8.80228 11.5833 9.56895 12.25C10.3689 12.9167 11.3523 13.5333 12.5189 14.1C13.7189 14.6667 15.0023 15.25 16.3689 15.85C17.7689 16.45 19.0523 17.1833 20.2189 18.05C21.4189 18.8833 22.4023 19.9333 23.1689 21.2C23.9689 22.4333 24.3689 23.9833 24.3689 25.85C24.3689 27.7167 24.0523 29.3333 23.4189 30.7C22.8189 32.0333 21.9523 33.15 20.8189 34.05C19.7189 34.95 18.3689 35.6167 16.7689 36.05C15.2023 36.4833 13.4689 36.7 11.5689 36.7C9.06895 36.7 6.86895 36.4667 4.96895 36C3.06895 35.5333 1.66895 35.0667 0.768945 34.6L2.96895 28.75C3.33561 28.95 3.80228 29.1667 4.36895 29.4C4.96895 29.6333 5.63561 29.85 6.36895 30.05C7.10228 30.25 7.86895 30.4167 8.66895 30.55C9.50228 30.6833 10.3523 30.75 11.2189 30.75C13.2523 30.75 14.8023 30.4167 15.8689 29.75C16.9689 29.05 17.5189 28 17.5189 26.6ZM37.8826 25.05L38.7826 28.95H39.0826L39.7326 25L43.5326 11H50.2326L42.6326 33.55C41.9993 35.4167 41.3826 37.1167 40.7826 38.65C40.216 40.2167 39.5826 41.5667 38.8826 42.7C38.1826 43.8333 37.3993 44.7 36.5326 45.3C35.6993 45.9333 34.6993 46.25 33.5326 46.25C31.7993 46.25 30.416 45.9667 29.3826 45.4L30.5826 40.2C31.0826 40.4 31.5826 40.5 32.0826 40.5C32.8493 40.5 33.5826 40.1667 34.2826 39.5C35.016 38.8667 35.566 37.7 35.9326 36L25.4826 11H33.2826L37.8826 25.05ZM67.9596 36V21.8C67.9596 19.7667 67.6596 18.3 67.0596 17.4C66.4929 16.5 65.5096 16.05 64.1096 16.05C62.8762 16.05 61.8262 16.4167 60.9596 17.15C60.1262 17.85 59.5262 18.7333 59.1596 19.8V36H52.6596V11H57.8096L58.5596 14.3H58.7596C59.5262 13.2333 60.5429 12.3 61.8096 11.5C63.0762 10.7 64.7096 10.3 66.7096 10.3C67.9429 10.3 69.0429 10.4667 70.0096 10.8C70.9762 11.1333 71.7929 11.6833 72.4596 12.45C73.1262 13.2167 73.6262 14.2667 73.9596 15.6C74.2929 16.9 74.4596 18.5167 74.4596 20.45V36H67.9596ZM97.6057 34.45C96.6057 35.1833 95.389 35.7333 93.9557 36.1C92.5557 36.5 91.1057 36.7 89.6057 36.7C87.6057 36.7 85.9057 36.3833 84.5057 35.75C83.139 35.1167 82.0223 34.2333 81.1557 33.1C80.289 31.9333 79.6557 30.5333 79.2557 28.9C78.889 27.2667 78.7057 25.4667 78.7057 23.5C78.7057 19.2667 79.6557 16.0167 81.5557 13.75C83.4557 11.45 86.2223 10.3 89.8557 10.3C91.689 10.3 93.1557 10.45 94.2557 10.75C95.389 11.05 96.4057 11.4333 97.3057 11.9L95.7557 17.2C94.989 16.8333 94.2223 16.55 93.4557 16.35C92.7223 16.15 91.8723 16.05 90.9057 16.05C89.1057 16.05 87.739 16.65 86.8057 17.85C85.8723 19.0167 85.4057 20.9 85.4057 23.5C85.4057 24.5667 85.5223 25.55 85.7557 26.45C85.989 27.35 86.339 28.1333 86.8057 28.8C87.2723 29.4667 87.8723 30 88.6057 30.4C89.3723 30.7667 90.2557 30.95 91.2557 30.95C92.3557 30.95 93.289 30.8167 94.0557 30.55C94.8223 30.25 95.5057 29.9 96.1057 29.5L97.6057 34.45ZM120.706 33.85C119.706 34.65 118.34 35.3333 116.606 35.9C114.906 36.4333 113.09 36.7 111.156 36.7C107.123 36.7 104.173 35.5333 102.306 33.2C100.44 30.8333 99.5064 27.6 99.5064 23.5C99.5064 19.1 100.556 15.8 102.656 13.6C104.756 11.4 107.706 10.3 111.506 10.3C112.773 10.3 114.006 10.4667 115.206 10.8C116.406 11.1333 117.473 11.6833 118.406 12.45C119.34 13.2167 120.09 14.25 120.656 15.55C121.223 16.85 121.506 18.4667 121.506 20.4C121.506 21.1 121.456 21.85 121.356 22.65C121.29 23.45 121.173 24.2833 121.006 25.15H106.006C106.106 27.25 106.64 28.8333 107.606 29.9C108.606 30.9667 110.206 31.5 112.406 31.5C113.773 31.5 114.99 31.3 116.056 30.9C117.156 30.4667 117.99 30.0333 118.556 29.6L120.706 33.85ZM111.406 15.5C109.706 15.5 108.44 16.0167 107.606 17.05C106.806 18.05 106.323 19.4 106.156 21.1H115.456C115.59 19.3 115.306 17.9167 114.606 16.95C113.94 15.9833 112.873 15.5 111.406 15.5ZM139.897 17.1C138.864 16.7333 137.93 16.55 137.097 16.55C135.93 16.55 134.947 16.8667 134.147 17.5C133.38 18.1 132.864 18.8833 132.597 19.85V36H126.097V11H131.147L131.897 14.3H132.097C132.664 13.0667 133.43 12.1167 134.397 11.45C135.364 10.7833 136.497 10.45 137.797 10.45C138.664 10.45 139.647 10.6333 140.747 11L139.897 17.1ZM143.476 12.45C144.81 11.85 146.393 11.3833 148.226 11.05C150.06 10.6833 151.976 10.5 153.976 10.5C155.71 10.5 157.16 10.7167 158.326 11.15C159.493 11.55 160.41 12.1333 161.076 12.9C161.776 13.6667 162.26 14.5833 162.526 15.65C162.826 16.7167 162.976 17.9167 162.976 19.25C162.976 20.7167 162.926 22.2 162.826 23.7C162.726 25.1667 162.66 26.6167 162.626 28.05C162.626 29.4833 162.676 30.8833 162.776 32.25C162.876 33.5833 163.126 34.85 163.526 36.05H158.226L157.176 32.6H156.926C156.26 33.6333 155.326 34.5333 154.126 35.3C152.96 36.0333 151.443 36.4 149.576 36.4C148.41 36.4 147.36 36.2333 146.426 35.9C145.493 35.5333 144.693 35.0333 144.026 34.4C143.36 33.7333 142.843 32.9667 142.476 32.1C142.11 31.2 141.926 30.2 141.926 29.1C141.926 27.5667 142.26 26.2833 142.926 25.25C143.626 24.1833 144.61 23.3333 145.876 22.7C147.176 22.0333 148.71 21.5833 150.476 21.35C152.276 21.0833 154.276 21 156.476 21.1C156.71 19.2333 156.576 17.9 156.076 17.1C155.576 16.2667 154.46 15.85 152.726 15.85C151.426 15.85 150.043 15.9833 148.576 16.25C147.143 16.5167 145.96 16.8667 145.026 17.3L143.476 12.45ZM151.726 31.05C153.026 31.05 154.06 30.7667 154.826 30.2C155.593 29.6 156.16 28.9667 156.526 28.3V25.05C155.493 24.95 154.493 24.9333 153.526 25C152.593 25.0667 151.76 25.2167 151.026 25.45C150.293 25.6833 149.71 26.0167 149.276 26.45C148.843 26.8833 148.626 27.4333 148.626 28.1C148.626 29.0333 148.893 29.7667 149.426 30.3C149.993 30.8 150.76 31.05 151.726 31.05Z" />
          </svg>
        </div>

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
