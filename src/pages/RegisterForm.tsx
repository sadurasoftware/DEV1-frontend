import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLoginInfoStore } from '@/store/useLoginInfoStore'
import { roleType } from '@/types/roleTypes'
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { useFetchRoles } from '../hooks/useFetchRoles'
import { useRegisterMutation } from '../hooks/useRegister'
import useThemeStore from '../store/themeStore'
import { PasswordType, User } from '../types/registerTypes'
import { registerValidation } from '../validation/registerValidation'

const RegisterForm: React.FC = () => {
  const { theme } = useThemeStore()
  const { user } = useLoginInfoStore()
  const [formData, setFormData] = useState<User>({
    id: 0,
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  })
  const [passwordCondition, setPasswordCondition] = useState<PasswordType>({
    minLength: false,
    maxLength: false,
    hasUpperCase: false,
    hasSpecialChar: false,
    hasNumber: false,
  })
  const [copy, setCopy] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const validatedPassword = (password: string) => {
    setPasswordCondition({
      minLength: password.length >= 6,
      maxLength: password.length <= 20,
      hasUpperCase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[^A-Za-z0-9]/.test(password),
    })
  }

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const { mutate, isError, isSuccess } = useRegisterMutation()
  const { rolesLoading, rolesData } = useFetchRoles()
  const { roles } = rolesData || {}

  const isSuperAdmin = user?.roleId === 1

  const rolesFilter = roles?.filter(role => role.name !== 'superadmin')

  useEffect(() => {
    setFormData(prevData => ({
      ...prevData,
    }))
  }, [theme])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === 'password' || name === 'confirmPassword') {
      validatedPassword(value)
    }

    setFormData({
      ...formData,
      [name]: value,
    })
    setFormErrors({})
    setApiError(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})
    setApiError(null)

    if (formData.password !== formData.confirmPassword) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match!',
      }))
      return
    }

    if (!isSuperAdmin) {
      setFormData(prevData => ({
        ...prevData,
        role: 'user',
      }))
    }

    try {
      registerValidation.parse(formData)
      mutate(formData, {
        onSuccess: () => {
          setFormData({
            id: 0,
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'user',
          })
        },
        onError: err => {
          if (err && err.response && err.response.data) {
            setApiError(err.response.data.message)
          }
        },
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: { [key: string]: string } = {}
        err.errors.forEach(error => {
          errors[error.path[0]] = error.message
        })
        setFormErrors(errors)
      }
    }
  }

  const generatedPassword = () => {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+={}[]'

    let generatePassword = ''
    let hasUpperCase = false
    let hasNumber = false
    let hasSpecialChar = false

    while (
      !hasUpperCase ||
      !hasNumber ||
      !hasSpecialChar ||
      generatePassword.length < 8
    ) {
      generatePassword = ''
      hasUpperCase = false
      hasNumber = false
      hasSpecialChar = false

      for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length)
        generatePassword += charset.charAt(randomIndex)
      }

      hasUpperCase = /[A-Z]/.test(generatePassword)
      hasNumber = /\d/.test(generatePassword)
      hasSpecialChar = /[^A-Za-z0-9]/.test(generatePassword)
    }

    setFormData(prevData => ({
      ...prevData,
      password: generatePassword,
      confirmPassword: generatePassword,
    }))
    validatedPassword(generatePassword)
  }

  // console.log(formData.password);

  const copyToClipboard = () => {
    if (formData.password) {
      navigator.clipboard.writeText(formData.password)
      setCopy('Copied')
    }
  }

  // const formStyles =
  //   theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
  // const labelStyles = theme === "light" ? "text-black" : "text-white"
  // const inputStyles =
  //   theme === "light"
  //     ? "border-gray-300 text-black"
  //     : "border-gray-600 text-white bg-gray-700"

  const errPWmxLength = passwordCondition.maxLength
  const errPWminLength = passwordCondition.minLength
  const errPWupperClass = passwordCondition.hasUpperCase
  const errPWnum = passwordCondition.hasNumber
  const errPWspeChar = passwordCondition.hasSpecialChar

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 rounded-lg border w-md  m-auto mt-3 mb-3 bg-white dark:bg-black">
          <h2 className="text-2xl font-semibold  mb-6 dark:text-cust-green">
            Let’s get started
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid gap-4 grid-cols-2">
                <div>
                  <Label htmlFor="username" className="label">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {formErrors.username && (
                    <p className="text-red-500 text-sm">
                      {formErrors.username}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastname" className="label">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    id="lastname"
                    name="lastname"
                    // value={formData.lastname}
                    onChange={handleChange}
                  />
                  {/* <p className="text-red-500 text-sm"> Last Name is required</p> */}
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="label">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm">{formErrors.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password" className="label">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <span
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {isSuperAdmin && (
                  <div>
                    <Button
                      onClick={generatedPassword}
                      type="button"
                      className="py-3 mt-3 my-3 p-3 mx-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      Generate Password
                    </Button>
                    <Button
                      onClick={copyToClipboard}
                      type="button"
                      className="py-3 mt-3 my-3 p-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      Copy
                    </Button>
                    {copy && <p className="text-red-300">{copy}</p>}
                  </div>
                )}

                <div className="pt-2">
                  {formErrors.password && (
                    <p className="text-red-500 text-sm">
                      {formErrors.password}
                    </p>
                  )}
                  <p className="text-red-500 text-sm">Password should </p>
                  <p
                    className="errorMsg"
                    style={{
                      color: errPWmxLength ? 'green' : 'red',
                    }}
                  >
                    {errPWmxLength ? <FaCircleCheck /> : <FaCircleXmark />}
                    Maximum 20 characters
                  </p>
                  <p
                    className="errorMsg"
                    style={{
                      color: errPWminLength ? 'green' : 'red',
                    }}
                  >
                    {errPWminLength ? <FaCircleCheck /> : <FaCircleXmark />}
                    At least 8 characters long
                  </p>

                  <p
                    className="errorMsg"
                    style={{
                      color: errPWupperClass ? 'green' : 'red',
                    }}
                  >
                    {errPWupperClass ? <FaCircleCheck /> : <FaCircleXmark />}
                    Contains at least one uppercase letter
                  </p>
                  <p
                    className="errorMsg"
                    style={{
                      color: errPWnum ? 'green' : 'red',
                    }}
                  >
                    {errPWnum ? <FaCircleCheck /> : <FaCircleXmark />}
                    Contains at least one number
                  </p>
                  <p
                    className="errorMsg"
                    style={{
                      color: errPWspeChar ? 'green' : 'red',
                    }}
                  >
                    {errPWspeChar ? <FaCircleCheck /> : <FaCircleXmark />}
                    Contains at least one special character
                  </p>
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="label">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />

                    <span
                      className="absolute right-3 top-3 cursor-pointer"
                      onClick={() => setShowConfirmPassword(prev => !prev)}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  {formErrors.confirmPassword !== formErrors.password && (
                    <p style={{ color: 'red' }}>Password does not match!</p>
                  )}
                  {/* <p className='text-red-500 text-sm'>Password does not match!</p>*/}
                </div>

                {isSuperAdmin && (
                  <div>
                    <Label htmlFor="role" className="label">
                      Role
                    </Label>

                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    >
                      {!rolesLoading ? (
                        rolesFilter?.map((role: roleType, index: number) => (
                          <option key={index} value={role.name}>
                            {role.name}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          Loading roles...
                        </option>
                      )}
                    </select>
                    {formErrors.role && (
                      <p className="text-red-500 text-sm">{formErrors.role}</p>
                    )}
                  </div>
                )}
                <div className="flex gap-2 mt-4">
                  <Checkbox id="terms" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms"
                      className=" label  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept <Link to="/">terms and conditions</Link>
                    </label>
                  </div>
                </div>
                <div>
                  <Button
                    type="submit"
                    className="w-full mt-6 py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </form>
          {isSuccess && (
            <p className="text-green-500 text-center mt-4">
              Registration successful! Please check your email for verification.
            </p>
          )}
          {isError && apiError && (
            <p className="text-red-500 text-center mt-4">{apiError}</p>
          )}
          <div className="pt-5">
            <Link to="/login">Already Registered? Login here</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterForm
