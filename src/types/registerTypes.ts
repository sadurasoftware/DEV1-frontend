export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  role:'superadmin' | 'admin' | 'user'| 'moderator'| 'viewer';
};

export type ApiResponse = {
  message: string;
  user: User;
};

export type ErrorResponse= {
     message: string;
}

export type PasswordType = {
  minLength:boolean,
    maxLength: boolean,
    hasUpperCase: boolean,
    hasSpecialChar: boolean,
    hasNumber:boolean
}
