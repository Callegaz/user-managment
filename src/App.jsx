import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import ThemeToggle from './components/ThemeToggle'
import Login from './pages/login'
import SignUp from './pages/SignUp'
import Home from './pages/home'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth() // Use o contexto em vez de localStorage
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ThemeToggle />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App