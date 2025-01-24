export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type ApiResponse = {
  message: string;
  user: User;
};

export type ErrorResponse= {
     message: string;
     }