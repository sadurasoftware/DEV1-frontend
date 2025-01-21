import { create } from "zustand";
import {LoginInfoState} from "../types/loginStoreType"

export const useLoginInfoStore = create<LoginInfoState>((set) => ({
  token: null,
  username: null,
  setLoginInfo: (token, username) => set({ token, username }),
  clearLoginInfo: () => set({ token: null, username: null }),
}));
