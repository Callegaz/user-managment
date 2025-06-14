import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { 
  DashboardContainer, 
  Title, 
  Button,
  UserTable,
  PaginationContainer,
  FormContainer,
  LogoutButton
} from './../styles'

// Mock API Service
const mockUsers = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 3 === 0 ? 'admin' : 'user'
}))

const fetchUsers = async (page = 1, perPage = 6) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  const start = (page - 1) * perPage
  const end = start + perPage
  return {
    data: mockUsers.slice(start, end),
    total: mockUsers.length
  }
}

export default function Home() {
  const { user, signOut, isAuthenticated, loading } = useAuth()
  const { isDarkMode } = useTheme()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [editingUser, setEditingUser] = useState(null)
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' })
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Verificação de sessão
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, loading, navigate])

  // Busca usuários cadastrados no localStorage
  const getRegisteredUsers = () => {
    try {
      return JSON.parse(localStorage.getItem('fakeUsersDB')) || []
    } catch {
      return []
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      const loadUsers = async () => {
        try {
          const { data, total } = await fetchUsers(currentPage)
          setUsers(data)
          setTotalPages(Math.ceil(total / 6))
        } catch (error) {
          setError('Erro ao carregar usuários')
        }
      }
      loadUsers()
    }
  }, [currentPage, isAuthenticated])

  const handleUpdate = (updatedUser) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u))
    setEditingUser(null)
    setSuccessMessage('Usuário atualizado com sucesso!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleCreate = () => {
    // Validação de campos obrigatórios
    if (!newUser.name || !newUser.email) {
      setError('Nome e email são obrigatórios')
      return
    }

    // Verifica se email já existe
    const registeredUsers = getRegisteredUsers()
    const allUsers = [...registeredUsers, ...mockUsers, ...users]
    
    if (allUsers.some(u => u.email === newUser.email)) {
      setError('Email já cadastrado')
      return
    }

    const newId = Math.max(0, ...users.map(u => u.id)) + 1
    setUsers([...users, { ...newUser, id: newId }])
    setNewUser({ name: '', email: '', role: 'user' })
    setError('')
    setSuccessMessage('Usuário criado com sucesso!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id))
    setSuccessMessage('Usuário excluído com sucesso!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  if (loading || !isAuthenticated) {
    return <div>Carregando...</div>
  }

  return (
    <DashboardContainer $isDarkMode={isDarkMode} data-testid="dashboard-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px'}}>
        <Title data-testid="welcome-message">Bem-vindo, {user?.name || 'Admin'}!</Title>
      </div>
      <LogoutButton onClick={signOut} data-testid="logout-button">
        Sair
      </LogoutButton>

      <FormContainer $isDarkMode={isDarkMode} data-testid="user-form">
        <h3>Adicionar Novo Usuário</h3>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Nome"
            value={newUser.name}
            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
            style={{ width: '100%', marginBottom: '0.5rem' }}
            data-testid="name-input"
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
            style={{ width: '100%', marginBottom: '0.5rem' }}
            data-testid="email-input"
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            style={{ width: '100%', marginBottom: '0.5rem' }}
            data-testid="role-select"
          >
            <option value="user">Usuário</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }} data-testid="error-message">{error}</div>}
        {successMessage && <div style={{ color: 'green', marginBottom: '1rem' }} data-testid="success-message">{successMessage}</div>}
        <Button onClick={handleCreate} data-testid="create-button">Criar Usuário</Button>
      </FormContainer>

      <div style={{ overflowX: 'auto' }}>
        <UserTable $isDarkMode={isDarkMode} data-testid="user-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th className="collapsable">Email</th>
              <th>Role</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} data-testid={`user-row-${user.id}`}>
                <td>
                  {editingUser?.id === user.id ? (
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                      data-testid="edit-name-input"
                    />
                  ) : (
                    <span data-testid={`user-name-${user.id}`}>{user.name}</span>
                  )}
                </td>
                <td className="collapsable">
                  {editingUser?.id === user.id ? (
                    <input
                      type="email"
                      value={editingUser.email}
                      onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                      data-testid="edit-email-input"
                    />
                  ) : (
                    <span 
                      className="email-text" 
                      onClick={(e) => e.currentTarget.classList.toggle('expanded')}
                      data-testid={`user-email-${user.id}`}
                    >
                      {user.email}
                    </span>
                  )}
                </td>
                <td>
                  {editingUser?.id === user.id ? (
                    <select
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                      data-testid="edit-role-select"
                    >
                      <option value="user">Usuário</option>
                      <option value="admin">Administrador</option>
                    </select>
                  ) : (
                    <span data-testid={`user-role-${user.id}`}>{user.role}</span>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {editingUser?.id === user.id ? (
                      <>
                        <Button onClick={() => handleUpdate(editingUser)} data-testid="save-button">Salvar</Button>
                        <Button onClick={() => setEditingUser(null)} data-testid="cancel-button">Cancelar</Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => setEditingUser({...user})} data-testid={`edit-button-${user.id}`}>Editar</Button>
                        <Button onClick={() => handleDelete(user.id)} data-testid={`delete-button-${user.id}`}>Excluir</Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </UserTable>
      </div>

      <PaginationContainer data-testid="pagination-container">
        <Button 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          data-testid="prev-page-button"
        >
          Anterior
        </Button>
        <span data-testid="page-info">Página {currentPage} de {totalPages}</span>
        <Button 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          data-testid="next-page-button"
        >
          Próxima
        </Button>
      </PaginationContainer>
    </DashboardContainer>
  )
}