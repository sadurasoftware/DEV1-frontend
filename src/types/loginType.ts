export type LoginUser = {
    email: string;
    password: string;
}



export type LoggedInUser = {
    token: string;  // The token a string
    username: string;    // The user object
}

export type ErrorResponse = {
    message:string;
  }

export type loggedout = {
    message:string;
}