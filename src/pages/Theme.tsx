import useThemeStore from '../store/themeStore'

const Theme: React.FC = () => {
  const { theme, setTheme } = useThemeStore()

  const handleSetTheme = (newTheme: string) => {
    setTheme(newTheme)
  }

  return (
    <div className="flex justify-end p-4 space-x-4">
      <button
        onClick={() => handleSetTheme('light')}
        className="px-4 py-2 bg-indigo-500 text-white rounded-md"
      >
        Light mode
      </button>
      <button
        onClick={() => handleSetTheme('dark')}
        className="px-4 py-2 bg-indigo-500 text-white rounded-md"
      >
        Dark mode
      </button>
    </div>
  )
}

export default Theme
