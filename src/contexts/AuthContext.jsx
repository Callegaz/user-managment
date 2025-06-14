// context/AuthContext.js
import { createContext, useState, useEffect, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/auth'

export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const initializeAuth = useCallback(() => {
    const savedAuth = authService.getCurrentAuth()
    setAuth(savedAuth)
    setLoading(false)
  }, [])

  const signIn = async (email, password) => {
    try {
      const authData = await authService.login({ email, password })
      setAuth(authData)
      navigate('/')
      return { success: true }
    } catch (error) {
      return { error: error.message }
    }
  }

  const signUp = async (userData) => {
    try {
      const authData = await authService.register(userData)
      setAuth(authData)
      navigate('/')
      return { success: true }
    } catch (error) {
      return { error: error.message }
    }
  }

  const signOut = useCallback(() => {
    authService.logout()
    setAuth(null)
    navigate('/login')
  }, [navigate])

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  const value = {
    user: auth?.user || null,
    token: auth?.token || null,
    loading,
    isAuthenticated: !!auth?.token,
    signIn,
    signUp,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}