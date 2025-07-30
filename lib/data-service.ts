// Utilitários para persistência local de dados
// NOTA: Para produção, substitua por API/base de dados real

interface User {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Moderator' | 'User'
  status: 'active' | 'inactive'
  joinDate: string
  lastActive: string
  avatar?: string
}

interface StorageKeys {
  USERS: 'leiriagenda_users'
  AUTH_USER: 'leiriagenda_auth_user'
  EVENTS: 'leiriagenda_events'
}

const STORAGE_KEYS: StorageKeys = {
  USERS: 'leiriagenda_users',
  AUTH_USER: 'leiriagenda_auth_user',
  EVENTS: 'leiriagenda_events'
}

// Dados iniciais padrão
const DEFAULT_USERS: User[] = [
  {
    id: "admin-1",
    name: "Administrador",
    email: "admin@leiriagenda.pt",
    role: "Admin",
    status: "active",
    joinDate: "2024-01-01",
    lastActive: new Date().toISOString().split('T')[0],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=administrador&backgroundColor=transparent"
  }
]

class DataService {
  // Métodos para utilizadores
  static getUsers(): User[] {
    if (typeof window === 'undefined') return DEFAULT_USERS
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USERS)
      return stored ? JSON.parse(stored) : DEFAULT_USERS
    } catch (error) {
      console.error('Erro ao carregar utilizadores:', error)
      return DEFAULT_USERS
    }
  }

  static saveUsers(users: User[]): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
    } catch (error) {
      console.error('Erro ao guardar utilizadores:', error)
    }
  }

  static addUser(user: Omit<User, 'id' | 'joinDate' | 'lastActive'>): User {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toISOString().split('T')[0],
      avatar: user.avatar || this.generateRandomAvatar(user.name)
    }

    const users = this.getUsers()
    users.push(newUser)
    this.saveUsers(users)
    
    return newUser
  }

  // Gerar avatar aleatório usando API gratuita
  static generateRandomAvatar(name: string): string {
    const seed = name.replace(/\s+/g, '').toLowerCase()
    // Usar DiceBear API para avatares consistentes e bonitos
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=transparent`
  }

  // Gerar novo avatar aleatório
  static generateNewRandomAvatar(): string {
    const randomSeed = Math.random().toString(36).substr(2, 9)
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}&backgroundColor=transparent`
  }

  static updateUser(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers()
    const userIndex = users.findIndex(u => u.id === id)
    
    if (userIndex === -1) return null
    
    users[userIndex] = { 
      ...users[userIndex], 
      ...updates,
      lastActive: new Date().toISOString().split('T')[0]
    }
    
    this.saveUsers(users)
    return users[userIndex]
  }

  static deleteUser(id: string): boolean {
    const users = this.getUsers()
    const filteredUsers = users.filter(u => u.id !== id)
    
    if (filteredUsers.length === users.length) return false
    
    this.saveUsers(filteredUsers)
    return true
  }

  // Métodos para autenticação
  static getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null
    
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AUTH_USER)
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error('Erro ao carregar utilizador atual:', error)
      return null
    }
  }

  static saveCurrentUser(user: User | null): void {
    if (typeof window === 'undefined') return
    
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user))
      } else {
        localStorage.removeItem(STORAGE_KEYS.AUTH_USER)
      }
    } catch (error) {
      console.error('Erro ao guardar utilizador atual:', error)
    }
  }

  static login(email: string, password: string): User | null {
    // Simulação de login - em produção, validar com API
    const users = this.getUsers()
    const user = users.find(u => u.email === email)
    
    if (user && user.status === 'active') {
      // Atualizar última atividade
      this.updateUser(user.id, { lastActive: new Date().toISOString().split('T')[0] })
      this.saveCurrentUser(user)
      return user
    }
    
    return null
  }

  static register(userData: { name: string; email: string; password: string }): User | null {
    const users = this.getUsers()
    
    // Verificar se email já existe
    if (users.find(u => u.email === userData.email)) {
      return null // Email já existe
    }
    
    // Criar novo utilizador com avatar aleatório
    const newUser = this.addUser({
      name: userData.name,
      email: userData.email,
      role: 'User',
      status: 'active',
      avatar: this.generateRandomAvatar(userData.name)
    })
    
    this.saveCurrentUser(newUser)
    return newUser
  }

  static logout(): void {
    this.saveCurrentUser(null)
  }

  // Método para limpar todos os dados (útil para desenvolvimento)
  static clearAllData(): void {
    if (typeof window === 'undefined') return
    
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
  }

  // Método para exportar dados (backup)
  static exportData(): string {
    const data = {
      users: this.getUsers(),
      currentUser: this.getCurrentUser(),
      exportDate: new Date().toISOString()
    }
    
    return JSON.stringify(data, null, 2)
  }

  // Método para importar dados (restore)
  static importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData)
      
      if (data.users) {
        this.saveUsers(data.users)
      }
      
      return true
    } catch (error) {
      console.error('Erro ao importar dados:', error)
      return false
    }
  }
}

export default DataService
export type { User }
