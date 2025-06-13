import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { HomeContainer, Title, Button } from './../styles'

export default function Home() {
  const { user, signOut } = useAuth()
  const { isDarkMode } = useTheme()

  return (
    <HomeContainer $isDarkMode={isDarkMode}  data-testid="home-page">
      <Title  data-testid="welcome-message">Bem-vindo, {user?.email || 'Usuário'}!</Title>
      <Button onClick={signOut} data-testid="logout-button">Sair</Button>
    </HomeContainer>
  )
}