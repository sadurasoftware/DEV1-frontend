export type LoginUser = {
  email: string
  password: string
}

export type User = {
  id: number
  firstname: string
  lastname: string
  email: string
  password: string
  isVerified: boolean
  roleId: number
  department:string
  createdAt: string
  updatedAt: string
}

export type LoggedInUser = {
  token: string
  user: User
}

export type ErrorResponse = {
  message: string
}

export type loggedout = {
  message: string
}

export type logoutProps = {
  token: string | null
  clearLoginInfo: () => void
}

export type GetUserResponse = {
  userData: User
}

export type GetAdminResponse = {
  userData: User
}
