import styled from 'styled-components'
import { useTheme } from '../contexts/ThemeContext'

const ToggleContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
`

const ToggleButton = styled.button`
  padding: 8px 16px;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#333' : '#646cff')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#444' : '#535bf2')};
  }
`

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <ToggleContainer>
      <ToggleButton $isDarkMode={isDarkMode} onClick={toggleTheme}>
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </ToggleButton>
    </ToggleContainer>
  )
}