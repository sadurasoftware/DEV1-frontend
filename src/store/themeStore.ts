import { create } from 'zustand'

type ThemeState = {
  theme: string
  toggleTheme: () => void
  setTheme: (theme: string) => void
}

const useThemeStore = create<ThemeState>(set => ({
  theme: 'light', // Default light theme
  toggleTheme: () =>
    set(state => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      return { theme: newTheme }
    }),
  setTheme: theme => set({ theme }),
}))

export default useThemeStore
