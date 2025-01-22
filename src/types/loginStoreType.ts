export type LoginInfoState = {
  token:string|null;
  username:string|null;
 
  setLoginInfo: (token: string, username: string) => void;
  clearLoginInfo: () => void;
}