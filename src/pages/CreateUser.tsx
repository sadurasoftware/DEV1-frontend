import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLoginInfoStore } from '@/store/useLoginInfoStore'
import { roleType } from '@/types/roleTypes'
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {  z } from 'zod'
import { useFetchDepartments } from '../hooks/useFetchDepartments'
import { useFetchRoles } from '../hooks/useFetchRoles'
import useThemeStore from '../store/themeStore'
import { CreateUserType } from '../types/registerTypes'
import { createUserValidation } from '../validation/createUserValidation'
import { useCreateUserMutation } from '@/hooks/useCreateUser'


const CreateUser: React.FC = () => {
  const { theme } = useThemeStore()
  const { user } = useLoginInfoStore()
  const [formData, setFormData] = useState<CreateUserType>({
    // id: 0,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
    role: 'user',
    departmentId: 0,
  })

  const [copy, setCopy] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<any>()
  const [passwordStrengthValue, setPasswordStrengthValue] = useState<any>()

  const [passwordStrengthColor, setPasswordStrengthColor] = useState('')

  const stongPasswordChecking = (password: string) => {
    let score = 0
    if (password.length >= 8) {
      score += 10
    }
    if (/[a-z]/.test(password)) {
      score += 10
    }                                     
    if (/[A-Z]/.test(password)) {
      score += 20
    }
    if (/[0-9]/.test(password)) {
      score += 30
    }
    if (/[!@#$%^&*]/.test(password)) {
      score += 30
    }
    return score
  }



  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const { mutate, isError, isSuccess } = useCreateUserMutation()
  const { rolesLoading, rolesData } = useFetchRoles()
  const { roles } = rolesData || {}
  const { departmentsLoading, departmentsData } = useFetchDepartments()
  const { departments } = departmentsData || {}

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
    const { name, value } = e.target as HTMLInputElement

    setFormData({
      ...formData,
      [name]: value,
    })

    if (name === 'password') {
      const strengthValue = stongPasswordChecking(value)
      setPasswordStrengthValue(strengthValue)

      if (strengthValue >= 80) {
        setPasswordStrength('Strong')
        setPasswordStrengthColor('#22c55e')
      }
      else if (strengthValue >= 60) {
        setPasswordStrength('Good')
        setPasswordStrengthColor('#349beb')
      }
      else if (strengthValue >= 40) {
        setPasswordStrength('Medium')
        setPasswordStrengthColor('#facc15')
      }
      else {
        setPasswordStrength('Weak')
        setPasswordStrengthColor('#f87171')
      }

    }
   
  
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
    const newFormData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      password: formData.password,
      terms: formData.terms,
      role: formData.role,
      departmentId: formData.departmentId,
    }
    try {
      createUserValidation.parse(formData)
      mutate(newFormData, {
        onSuccess: () => {
          setFormData({
            // id: 0,
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            confirmPassword: '',
            terms: false,
            role: 'user',
            departmentId: 0,
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
  }

  const copyToClipboard = () => {
    if (formData.password) {
      navigator.clipboard.writeText(formData.password)
      setCopy('Copied')
    }
  }

  return (
    <>
      <ModeToggle />
      <div className="min-h-screen flex items-center justify-center ">
        <div className="max-w-md w-full p-8 rounded-lg border  m-auto mt-3 mb-3 bg-white dark:bg-black">
          <h2 className="text-2xl font-semibold  mb-6 dark:text-cust-green">
            Create User
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid gap-4 grid-cols-2">
                <div>
                  <Label htmlFor="username" className="text-xs font-medium">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                  {formErrors.firstname && (
                    <p className="text-error-red text-sm">
                      {formErrors.firstname}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastname" className="text-xs font-medium">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                  {formErrors.lastname && (
                    <p className="text-error-red text-sm">
                      {formErrors.lastname}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-xs font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && (
                  <p className="text-error-red text-sm">{formErrors.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password" className="text-xs font-medium">
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

                  <div className="flex gap-2 w-full h-0.5 mt-3">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm transition-all duration-300"
                        style={{
                          backgroundColor:
                            passwordStrengthValue >= (i + 1) * 20 ? passwordStrengthColor : '#e5e7eb',
                        }}
                      />
                    ))}
                  </div>
                  <Label htmlFor="password" className="text-xs font-medium text-right">
                    {passwordStrength}
                  </Label>
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
                    <p className="text-error-red text-sm">
                      {formErrors.password}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="text-xs font-medium"
                >
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
                  <p className="text-error-red text-sm">
                    Password does not match!
                  </p>
                )}
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
                    <p className="text-error-red text-sm">{formErrors.role}</p>
                  )}
                </div>
              )}

              <div>
                <Label htmlFor="department" className="label">
                  Department
                </Label>
                <select
                  id="departmentId"
                  name="departmentId"
                  value={formData.departmentId}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                >
                  <option value="">Select department</option>
                  {!departmentsLoading ? (
                    departments?.map((department, index) => (
                      <option key={index} value={department.id}>
                        {department.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      Loading departments...
                    </option>
                  )}
                </select>
                {formErrors.department && (
                  <p className="text-error-red text-sm">
                    {formErrors.department}
                  </p>
                )}
              </div>

              <div className="flex gap-2 mt-4 items-center">
                <Checkbox
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onCheckedChange={checked => {
                    setFormData(formData => ({
                      ...formData,
                      terms: checked === true,
                    }))
                  }}
                />

                <div className="grid gap-1.5 ">
                  <label
                    htmlFor="terms"
                    className="text-xs  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <Link to="/" className="underline">
                      Accept terms and conditions
                    </Link>
                  </label>
                </div>
              </div>
              {formErrors.terms && (
                <p className="text-error-red text-sm ">{formErrors.terms}</p>
              )}

              <div>
                <Button
                  type="submit"
                  className="w-full py-3 bg-cust-blue text-white dark:text-black font-semibold rounded-md hover:bg-cust-blue transition dark:bg-cust-green dark:hover:bg-cust-green uppercase"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </form>
          {isSuccess && (
            <p className="text-green-500 text-center mt-4">
              Registration successful! Please check your email for verification.
            </p>
          )}
          {isError && apiError && (
            <p className="text-error-red text-center mt-4">{apiError}</p>
          )}
          <div className="pt-5 text-xs text-center">
            <Link to="/login">
              Already Registered?{' '}
              <span className="hover:underline">Login here</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateUser
