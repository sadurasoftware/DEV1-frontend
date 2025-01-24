import { User } from "./loginType";

export type LoginInfoState = {
  token:string|null;
  username:string|null;
  user:User|null;
  setLoginInfo: (token: string, user: User) => void;
  clearLoginInfo: () => void;
}