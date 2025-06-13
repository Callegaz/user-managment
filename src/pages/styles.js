import styled from 'styled-components'

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#333' : '#f5f5f5')};
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#fff' : '#000')};
  transition: all 0.3s ease;
`

export const HomeContainer = styled(AuthContainer)`
  // Estilos específicos da home (se necessário)
`

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background: ${({ $isDarkMode }) => ($isDarkMode ? '#444' : 'white')};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? '#555' : '#ddd')};
  border-radius: 4px;
  font-size: 1rem;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#555' : '#fff')};
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#fff' : '#000')};
`

export const Button = styled.button`
  padding: 0.75rem;
  background-color: #646cff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #535bf2;
  }
`

export const Title = styled.h1`
  color: #646cff;
  margin-bottom: 1.5rem;
`

export const AuthLink = styled.span`
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#aaa' : '#666')};
  text-align: center;
  margin-top: 1rem;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #646cff;
  }
`

export const ErrorText = styled.p`
  color: #ff4d4f;
  font-size: 0.875rem;
  margin: -0.5rem 0 0.5rem;
`