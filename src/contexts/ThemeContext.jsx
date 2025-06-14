import { createContext, useState, useContext, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('themePreference')
    return savedTheme ? JSON.parse(savedTheme) : false
  })

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode
      localStorage.setItem('themePreference', JSON.stringify(newMode))
      return newMode
    })
  }

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode'
  }, [isDarkMode])

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}