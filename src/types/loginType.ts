export type LoginUser = {
    email: string;
    password: string;
}

export type User = {
    id: number;
    username: string;
    email: string;  
    password: string;
    isVerified: boolean;
    createdAt:string;
    updatedAt:string;
  };

export type LoggedInUser = {
    token: string;  // The token a string
    user: User;
}

export type ErrorResponse = {
    message:string;
  }

export type loggedout = {
    message:string;
}

export type  logoutProps = {
    token: string | null;
    clearLoginInfo: () => void;
  }