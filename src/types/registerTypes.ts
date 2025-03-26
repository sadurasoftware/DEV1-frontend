export type User = {
  id: number
  firstname: string
  lastname: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
  role: 'superadmin' | 'admin' | 'user' | 'moderator' | 'viewer'
  department: string | null
}

export type ApiResponse = {
  message: string
  user: User
}

export type ErrorResponse = {
  message: string
}

export type PasswordType = {
  minLength: boolean
  maxLength: boolean
  hasUpperCase: boolean
  hasSpecialChar: boolean
  hasNumber: boolean
}
