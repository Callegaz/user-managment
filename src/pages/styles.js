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
export const LogoutButton = styled(Button)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 10;
`
export const DashboardContainer = styled.div`
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#121212' : '#f5f5f5')};
  color: ${({ $isDarkMode }) => ($isDarkMode ? '#fff' : '#333')};
  min-height: 100vh;
  width: 100vw;
  padding: 1.4rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`

export const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#1e1e1e' : '#fff')};
  
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? '#444' : '#ddd')};
  }

  th {
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#333' : '#646cff')};
    color: white;
  }

  tr:hover {
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#333' : '#f5f5f5')};
  }
`

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`

export const FormContainer = styled.div`
  background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#1e1e1e' : '#fff')};
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  input, select {
    margin-right: 1rem;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid ${({ $isDarkMode }) => ($isDarkMode ? '#444' : '#ddd')};
    background-color: ${({ $isDarkMode }) => ($isDarkMode ? '#333' : '#fff')};
    color: ${({ $isDarkMode }) => ($isDarkMode ? '#fff' : '#333')};
  }
`