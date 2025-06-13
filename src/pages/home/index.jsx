// src/pages/home.jsx
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { Container as HomeContainer, Title, Button } from './../styles'

export default function Home() {
  const navigate = useNavigate()
  const { isDarkMode } = useTheme()

  return (
    <HomeContainer $isDarkMode={isDarkMode}>
      <Title>Bem-vindo à Página Inicial</Title>
      <Button onClick={() => navigate('/')}>Voltar para Login</Button>
    </HomeContainer>
  )
}