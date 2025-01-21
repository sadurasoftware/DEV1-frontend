import axios, { AxiosResponse } from "axios";
import { loggedout } from "@/types/loginType";


export const logout = async (token: string, username: string): Promise<loggedout> => {
  try {
    const res: AxiosResponse = await axios.post("http://localhost:5000/api/auth/logout", {
      token: token,
      username: username,
    });

    if (!res) {
      throw new Error("Error fetching API");
    }

    return res.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error; 
  }
};
