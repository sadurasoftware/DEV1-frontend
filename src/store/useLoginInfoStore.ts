import { create } from 'zustand'

import { createJSONStorage, persist } from 'zustand/middleware'
import { LoginInfoState } from '../types/loginStoreType'
import { User } from '../types/loginType'

// Explicitly typing 'set' as SetState<LoginInfoState>
export const useLoginInfoStore = create<LoginInfoState>()(
  persist(
    set => ({
      token: null,
      user: null,
      setLoginInfo: (token: string, user: User) => set({ token, user }),
      clearLoginInfo: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
