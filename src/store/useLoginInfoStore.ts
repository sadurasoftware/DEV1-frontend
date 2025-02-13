import { create } from 'zustand'
import { LoginInfoState } from '../types/loginStoreType'
import { User } from '../types/loginType'
import zukeeper from 'zukeeper'

// Explicitly typing 'set' as SetState<LoginInfoState>
export const useLoginInfoStore = create<LoginInfoState>(
  zukeeper((set: (state: Partial<LoginInfoState>) => void) => ({
    token: null,
    user: null,
    setLoginInfo: (token: string, user: User) => set({ token, user }),
    clearLoginInfo: () => set({ token: null, user: null }),
  }))
)
