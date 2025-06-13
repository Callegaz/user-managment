// src/pages/login.jsx
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { 
  Container as LoginContainer, 
  Form as LoginForm, 
  Input, 
  Button, 
  Title 
} from './../styles'

export default function Login() {
  const navigate = useNavigate()
  const { isDarkMode } = useTheme()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/home')
  }

  return (
    <LoginContainer $isDarkMode={isDarkMode}>
      <Title>Login</Title>
      <LoginForm $isDarkMode={isDarkMode} onSubmit={handleSubmit}>
        <Input $isDarkMode={isDarkMode} type="text" placeholder="Usuário" required />
        <Input $isDarkMode={isDarkMode} type="password" placeholder="Senha" required />
        <Button type="submit">Entrar</Button>
      </LoginForm>
    </LoginContainer>
  )
}