const getUsersDB = () => {
  try {
    return JSON.parse(localStorage.getItem('fakeUsersDB')) || []
  } catch {
    return []
  }
}

export const registerUser = async (userData) => {
  const users = getUsersDB()
  
  if (users.some(u => u.email === userData.email)) {
    throw new Error('E-mail já cadastrado')
  }

  const newUser = {
    id: Date.now().toString(),
    email: userData.email,
    password: userData.password
  }
  
  localStorage.setItem('fakeUsersDB', JSON.stringify([...users, newUser]))
  
  return {
    token: `fake-jwt-${newUser.id}`,
    user: { id: newUser.id, email: newUser.email }
  }
}

export const loginUser = async ({ email, password }) => {
  const users = getUsersDB()
  const user = users.find(u => u.email === email && u.password === password)
  
  if (!user) {
    throw new Error('Credenciais inválidas')
  }

  return {
    token: `fake-jwt-${user.id}`,
    user: { id: user.id, email: user.email }
  }
}