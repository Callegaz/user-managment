import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuth } from '../../contexts/AuthContext'
import { 
  AuthContainer, 
  AuthForm, 
  Input, 
  Button, 
  Title,
  AuthLink,
  ErrorText
} from './../styles'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { isDarkMode } = useTheme()
  const { signIn } = useAuth()
  const navigate = useNavigate()

   const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      const result = await signIn(email, password)
      if (result.error) {
        setError(result.error)
      }
    } catch (err) {
      setError('Ocorreu um erro durante o login. Tente novamente.')
    }
  }

  return (
    <AuthContainer $isDarkMode={isDarkMode} data-testid="login-page">
      <Title>Login</Title>
      <AuthForm $isDarkMode={isDarkMode} onSubmit={handleSubmit} data-testid="login-form">
        <Input
          data-testid="email-input"
          $isDarkMode={isDarkMode}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          data-testid="password-input"
          $isDarkMode={isDarkMode}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <ErrorText data-testid="error-message">{error}</ErrorText>}
        <Button type="submit" data-testid="login-button">
          Entrar
        </Button>
        <AuthLink 
          $isDarkMode={isDarkMode} 
          data-testid="signup-link"
          onClick={() => navigate('/signup')}
        >
          Não tem conta? Cadastre-se
        </AuthLink>
      </AuthForm>
    </AuthContainer>
  )
}