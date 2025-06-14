// services/auth.js
import { storage } from './storage'

const DB_KEY = 'fakeUsersDB'
const AUTH_KEY = 'auth'

export const authService = {
  async register({ email, password, name }) {
    // Validação simples
    if (!email || !password || !name) {
      throw new Error('Todos os campos são obrigatórios')
    }

    const users = storage.get(DB_KEY) || []
    
    if (users.some(u => u.email === email)) {
      throw new Error('E-mail já cadastrado')
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password, // Em teste técnico, sem hash por simplicidade
      name
    }
    
    storage.set(DB_KEY, [...users, newUser])
    
    return this._createAuthResponse(newUser)
  },

  async login({ email, password }) {
    const users = storage.get(DB_KEY) || []
    const user = users.find(u => u.email === email && u.password === password)
    
    if (!user) {
      throw new Error('Credenciais inválidas')
    }

    return this._createAuthResponse(user)
  },

  getCurrentAuth() {
    return storage.get(AUTH_KEY)
  },

  logout() {
    storage.remove(AUTH_KEY)
  },

  _createAuthResponse(user) {
    const authData = {
      token: `fake-jwt-${user.id}`,
      user: { id: user.id, email: user.email, name: user.name }
    }
    storage.set(AUTH_KEY, authData)
    return authData
  }
}