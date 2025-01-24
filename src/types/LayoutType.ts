import {ReactNode} from "react";

export type UnauthenticatedLayoutProps = {
    children: ReactNode;
  };
  
  export type AuthenticatedLayoutProps = {
    children: ReactNode;
  };

export type childrenType = {
    children: ReactNode;
}
// export type NavbarProps ={
//     onLogout: () => void;
//   }