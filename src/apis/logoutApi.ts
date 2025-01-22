import axios, { AxiosResponse } from "axios";
import { loggedout } from "@/types/loginType";
import { useLoginInfoStore } from "@/store/useLoginInfoStore";

export const logout = async (): Promise<loggedout> => {
  
  const { token } = useLoginInfoStore(); 
  const clearLoginInfo = useLoginInfoStore((state) => state.clearLoginInfo)
  clearLoginInfo()

  try {
    const res: AxiosResponse = await axios.post("http://localhost:5000/api/auth/logout", {
      token: token,
      // username: username,
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
