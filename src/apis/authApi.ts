import axios, { AxiosResponse } from "axios";
import { LoginUser, LoggedInUser } from "@/types/loginType";

export const loginUser = async (user: LoginUser): Promise<LoggedInUser> => {
  const res: AxiosResponse = await axios.post("http://localhost:3000/api/auth/login", {
    email: user.email,
    password: user.password,
  });

  if (!res) {
    throw new Error("Error fetching API");
  }
  return res.data; 
};
