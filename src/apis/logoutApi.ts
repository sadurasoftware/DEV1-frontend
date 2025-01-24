import axios, { AxiosResponse } from "axios";
import { loggedout } from "@/types/loginType";
import { logoutProps } from "@/types/loginType";

export const logout = async ({ token, clearLoginInfo }: logoutProps): Promise<loggedout> => {

  clearLoginInfo()

  try {
    const res: AxiosResponse = await axios.post("http://localhost:3000/api/auth/logout", {
      token: token,
      
    }, { withCredentials: true });

    if (!res) {
      throw new Error("Error fetching API");
    }

    return res.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error; 
  }
};
