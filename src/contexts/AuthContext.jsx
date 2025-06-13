import { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../services/auth'

export const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const signIn = async (email, password) => {
    try {
      const { token, user } = await loginUser({ email, password })
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      navigate('/')
      return { success: true }
    } catch (error) {
      console.error('Login failed:', error)
      return { error: error.message }
    }
  }

  const signUp = async ({ email, password }) => {
    try {
      const { token, user } = await registerUser({ email, password })
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      navigate('/')
      return { success: true }
    } catch (error) {
      console.error('Registration failed:', error)
      return { error: error.message }
    }
  }

  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signIn, 
      signUp, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  )
}