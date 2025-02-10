import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react"
import { useRegisterMutation } from "../hooks/useRegister"
import { User } from "../types/registerTypes"
import { registerValidation } from "../validation/registerValidation"
import { z } from "zod"
import useThemeStore from "../store/themeStore"
import { PasswordType } from "../types/registerTypes"
import { useLoginInfoStore } from "@/store/useLoginInfoStore"
import { useFetchRoles } from "../hooks/useFetchRoles"
import { roleType } from "@/types/roleTypes"

const RegisterForm: React.FC = () => {
  const { theme } = useThemeStore()
  const { user } = useLoginInfoStore()
  const [formData, setFormData] = useState<User>({
    id: 0,
    username: "",
    email: "",
    password: "",
    role: "user",
  })
  const [passwordCondition, setPasswordCondition] = useState<PasswordType>({
    minLength: false,
    maxLength: false,
    hasUpperCase: false,
    hasSpecialChar: false,
    hasNumber: false,
  })
  const [copy, setCopy] = useState<string>("")

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

  const rolesFilter = roles?.filter((role) => role.name !== "superadmin")

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
    }))
  }, [theme])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name == "password") {
      validatedPassword(value)
    }

    setFormData({
      ...formData,
      [name]: value,
    })
    setFormErrors({})
    setApiError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})
    setApiError(null)

    if (!isSuperAdmin) {
      setFormData((prevData) => ({
        ...prevData,
        role: "user",
      }))
    }

    try {
      registerValidation.parse(formData)
      mutate(formData, {
        onSuccess: () => {
          setFormData({
            id: 0,
            username: "",
            email: "",
            password: "",
            role: "user",
          })
        },
        onError: (err) => {
          if (err && err.response && err.response.data) {
            setApiError(err.response.data.message)
          }
        },
      })
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: { [key: string]: string } = {}
        err.errors.forEach((error) => {
          errors[error.path[0]] = error.message
        })
        setFormErrors(errors)
      }
    }
  }

  const generatedPassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+={}[]"

    let generatePassword = ""
    let hasUpperCase = false
    let hasNumber = false
    let hasSpecialChar = false

    while (
      !hasUpperCase ||
      !hasNumber ||
      !hasSpecialChar ||
      generatePassword.length < 8
    ) {
      generatePassword = ""
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

    setFormData((prevData) => ({
      ...prevData,
      password: generatePassword,
    }))
    validatedPassword(generatePassword)
  }

  // console.log(formData.password);

  const copyToClipboard = () => {
    if (formData.password) {
      navigator.clipboard.writeText(formData.password)
      setCopy("Copied")
    }
  }

  // const formStyles =
  //   theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
  // const labelStyles = theme === "light" ? "text-black" : "text-white"
  // const inputStyles =
  //   theme === "light"
  //     ? "border-gray-300 text-black"
  //     : "border-gray-600 text-white bg-gray-700"

  return (
    <>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='p-8 rounded-lg border shadow-lg w-full max-w-xl'>
          <h2 className='text-2xl font-semibold text-center mb-6'>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className='space-y-4'>
              <div>
                <Label htmlFor='username'>Name</Label>
                <Input
                  type='text'
                  id='username'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                />
                {formErrors.username && (
                  <p className='text-red-500 text-sm'>{formErrors.username}</p>
                )}
              </div>
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && (
                  <p className='text-red-500 text-sm'>{formErrors.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor='password'>Password</Label>
                <Input
                  type='password'
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                />

                {isSuperAdmin && (
                  <div>
                    <button
                      onClick={generatedPassword}
                      type='button'
                      className='py-3 mt-3 my-3 p-3 mx-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                      Generate Password
                    </button>
                    <button
                      onClick={copyToClipboard}
                      type='button'
                      className='py-3 mt-3 my-3 p-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
                      Copy
                    </button>
                    {copy && <p className='text-red-300'>{copy}</p>}
                  </div>
                )}

                <div>
                  {formErrors.password && (
                    <p style={{ color: "red" }}>{formErrors.password}</p>
                  )}
                  <p
                    style={{
                      color: passwordCondition.minLength ? "green" : "red",
                    }}>
                    {passwordCondition.minLength ? "✔" : "❌"} At least 8
                    characters
                  </p>
                  <p
                    style={{
                      color: passwordCondition.maxLength ? "green" : "red",
                    }}>
                    {passwordCondition.maxLength ? "✔" : "❌"} Maximum 20
                    characters
                  </p>
                  <p
                    style={{
                      color: passwordCondition.hasUpperCase ? "green" : "red",
                    }}>
                    {passwordCondition.hasUpperCase ? "✔" : "❌"} Contains at
                    least one uppercase letter
                  </p>
                  <p
                    style={{
                      color: passwordCondition.hasNumber ? "green" : "red",
                    }}>
                    {passwordCondition.hasNumber ? "✔" : "❌"} Contains at least
                    one number
                  </p>
                  <p
                    style={{
                      color: passwordCondition.hasSpecialChar ? "green" : "red",
                    }}>
                    {passwordCondition.hasSpecialChar ? "✔" : "❌"} Contains at
                    least one special character
                  </p>
                </div>
                <div>
                  <Label htmlFor='confirmPassword'>Confirm Password</Label>
                  <Input
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                  />
                  {/* {formErrors.confirmPassword && (
                    <p style={{ color: "red" }}>Password does not match!</p>
                    )} */}
                </div>

                {isSuperAdmin && (
                  <div>
                    <Label htmlFor='role'>Role</Label>

                    <select
                      id='role'
                      name='role'
                      value={formData.role}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}>
                      {!rolesLoading ? (
                        rolesFilter?.map((role: roleType, index: number) => (
                          <option key={index} value={role.name}>
                            {role.name}
                          </option>
                        ))
                      ) : (
                        <option value='' disabled>
                          Loading roles...
                        </option>
                      )}
                    </select>
                    {formErrors.role && (
                      <p className='text-red-500 text-sm'>{formErrors.role}</p>
                    )}
                  </div>
                )}
                <div>
                  <Button
                    type='submit'
                    className='w-full mt-6 py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition'>
                    Register
                  </Button>
                </div>
              </div>
            </div>
          </form>
          {isSuccess && (
            <p className='text-green-500 text-center mt-4'>
              Registration successful! Please check your email for verification.
            </p>
          )}
          {isError && apiError && (
            <p className='text-red-500 text-center mt-4'>{apiError}</p>
          )}
          <div className='pt-5'>
            <Link to='/login'>Already Registered? Login here</Link>
          </div>
        </div>
      </div>
    </>
    // <div
    //   className={`max-w-lg mx-auto p-6 rounded-lg shadow-md flex flex-col ${formStyles}`}>
    //   <h2 className='text-2xl font-semibold text-center mb-6'>Register</h2>

    //   <form onSubmit={handleSubmit} className='space-y-4 flex-grow'>
    //     <div>
    //       <label htmlFor='username' className={labelStyles}>
    //         Name
    //       </label>
    //       <input
    //         type='text'
    //         id='username'
    //         name='username'
    //         value={formData.username}
    //         onChange={handleChange}
    //         className={`w-full p-3 border ${inputStyles} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
    //       />
    //       {formErrors.username && (
    //         <p className='text-red-500 text-sm'>{formErrors.username}</p>
    //       )}
    //     </div>

    //     <div>
    //       <label htmlFor='email' className={labelStyles}>
    //         Email
    //       </label>
    //       <input
    //         type='email'
    //         id='email'
    //         name='email'
    //         value={formData.email}
    //         onChange={handleChange}
    //         className={`w-full p-3 border ${inputStyles} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
    //       />
    //       {formErrors.email && (
    //         <p className='text-red-500 text-sm'>{formErrors.email}</p>
    //       )}
    //     </div>

    //     <div>
    //       <label htmlFor='password' className={labelStyles}>
    //         Password
    //       </label>
    //       <input
    //         type='password'
    //         id='password'
    //         name='password'
    //         value={formData.password}
    //         onChange={handleChange}
    //         className={`w-full p-3 border ${inputStyles} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
    //       />
    //       {formErrors.password && (
    //         <p style={{ color: "red" }}>{formErrors.password}</p>
    //       )}
    //       {isSuperAdmin && (
    //         <div>
    //           <button
    //             onClick={generatedPassword}
    //             type='button'
    //             className='py-3 mt-3 my-3 p-3 mx-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
    //             Generate Password
    //           </button>
    //           <button
    //             onClick={copyToClipboard}
    //             type='button'
    //             className='py-3 mt-3 my-3 p-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
    //             Copy
    //           </button>
    //           {copy && <p className='text-red-300'>{copy}</p>}
    //         </div>
    //       )}

    //       <p style={{ color: passwordCondition.minLength ? "green" : "red" }}>
    //         {passwordCondition.minLength ? "✔" : "❌"} At least 8 characters
    //       </p>
    //       <p style={{ color: passwordCondition.maxLength ? "green" : "red" }}>
    //         {passwordCondition.maxLength ? "✔" : "❌"} Maximum 20 characters
    //       </p>
    //       <p
    //         style={{ color: passwordCondition.hasUpperCase ? "green" : "red" }}>
    //         {passwordCondition.hasUpperCase ? "✔" : "❌"} Contains at least one
    //         uppercase letter
    //       </p>
    //       <p style={{ color: passwordCondition.hasNumber ? "green" : "red" }}>
    //         {passwordCondition.hasNumber ? "✔" : "❌"} Contains at least one
    //         number
    //       </p>
    //       <p
    //         style={{
    //           color: passwordCondition.hasSpecialChar ? "green" : "red",
    //         }}>
    //         {passwordCondition.hasSpecialChar ? "✔" : "❌"} Contains at least
    //         one special character
    //       </p>
    //     </div>

    //     {isSuperAdmin && (
    //       <div>
    //         <label htmlFor='role' className={labelStyles}>
    //           Role
    //         </label>
    //         <select
    //           id='role'
    //           name='role'
    //           value={formData.role}
    //           onChange={handleChange}
    //           className={`w-full p-3 border ${inputStyles} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}>
    //           {!rolesLoading ? (
    //             rolesFilter?.map((role: roleType, index: number) => (
    //               <option key={index} value={role.name}>
    //                 {role.name}
    //               </option>
    //             ))
    //           ) : (
    //             <option value='' disabled>
    //               Loading roles...
    //             </option>
    //           )}
    //         </select>
    //         {formErrors.role && (
    //           <p className='text-red-500 text-sm'>{formErrors.role}</p>
    //         )}
    //       </div>
    //     )}

    //     <div className='text-center mt-4'>
    //       <button
    //         type='submit'
    //         className='w-full py-3 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
    //         Register
    //       </button>
    //     </div>
    //   </form>

    //   {isSuccess && (
    //     <p className='text-green-500 text-center mt-4'>
    //       Registration successful! Please check your email for verification.
    //     </p>
    //   )}
    //   {isError && apiError && (
    //     <p className='text-red-500 text-center mt-4'>{apiError}</p>
    //   )}
    // </div>
  )
}

export default RegisterForm
