export type User = {
  // id: number
  firstname: string
  lastname: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
  role: string
  department: string
}

export type CreateUserType = {
  // id: number
  firstname: string
  lastname: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
  role: string
  departmentId: number
}



export type RegisterUser = {
  // id: number
  firstname: string
  lastname: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
  department: string
}

export type SendUser = {
  firstname: string
  lastname: string
  email: string
  password: string
  terms: boolean
  department: string
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
  // hasUpperCase: boolean
  // hasSpecialChar: boolean
  // hasNumber: boolean
}

export type userArray = {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  department: {
    id: number,
    name: string
  }
}

export type usersResponse = {
  message: string,
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  users: userArray[];
};

export type adminArray = {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  department: {
    id: number,
    name: string
  }
}

export type adminsResponse = {
  message: string,
  totalUsers: number;
  currentPage: number;
  totalPages: number;
  admins: adminArray[];
};