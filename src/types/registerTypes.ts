export type RegisterRequest = {
    username: string;
    email: string;
    password: string;
    terms: boolean;
    theme: string;
  };
  
  export type RegisterResponse = {
    message: string;
    success: boolean;
  };
  
  export type ErrorResponse= {
    message: string;
  }