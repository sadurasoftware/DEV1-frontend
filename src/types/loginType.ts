export type LoginUser = {
    email: string;
    password: string;
}

export type LoggedInUser = {
    data: string;  // The token a string
    user: LoginUser;    // The user object
    message: string; // Success message
}

export type ErrorResponse = {
    message:string;
  }