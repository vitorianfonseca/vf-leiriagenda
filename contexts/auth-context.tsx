"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  favorites?: string[]
  phone?: string
  location?: string
  bio?: string
  website?: string
  role?: "user" | "admin" | "moderator"
  provider?: "email" | "google"
  joinDate?: string
  lastLogin?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
  addToFavorites: (eventId: string) => void
  removeFromFavorites: (eventId: string) => void
  isFavorite: (eventId: string) => boolean
  updateProfile: (updatedData: Partial<User>) => void
  updateAvatar: (avatarUrl: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Chaves para localStorage
const USERS_KEY = "leiria-agenda-users"
const CURRENT_USER_KEY = "leiria-agenda-user"

// Utilizador admin padrão
const DEFAULT_ADMIN_USER: User = {
  id: "admin_1",
  name: "Administrador",
  email: "admin@leiriagenda.pt",
  avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AD",
  favorites: [],
  phone: "",
  location: "Leiria, Portugal",
  bio: "Administrador do sistema",
  website: "",
  role: "admin",
  provider: "email",
  joinDate: "2024-01-01T00:00:00.000Z",
  lastLogin: new Date().toISOString(),
}

function getStoredUsers(): User[] {
  if (typeof window === "undefined") return [DEFAULT_ADMIN_USER]
  try {
    const stored = localStorage.getItem(USERS_KEY)
    if (stored) {
      const users = JSON.parse(stored)
      // Garantir que o admin sempre existe
      if (!users.find(u => u.email === DEFAULT_ADMIN_USER.email)) {
        return [DEFAULT_ADMIN_USER, ...users]
      }
      return users
    }
    return [DEFAULT_ADMIN_USER]
  } catch (error) {
    console.error("Erro ao carregar utilizadores:", error)
    return [DEFAULT_ADMIN_USER]
  }
}

function storeUsers(users: User[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch (error) {
    console.error("Erro ao guardar utilizadores:", error)
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se há um utilizador logado
    try {
      const savedUser = localStorage.getItem(CURRENT_USER_KEY)
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      }
    } catch (error) {
      console.error("Erro ao carregar utilizador:", error)
      localStorage.removeItem(CURRENT_USER_KEY)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const register = async (name: string, email: string, password: string) => {
    try {
      const users = getStoredUsers()
      
      // Verificar se o email já existe
      if (users.find(u => u.email === email)) {
        throw new Error("Email já está em uso")
      }

      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
        favorites: [],
        role: "user",
        provider: "email",
        joinDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      }

      const updatedUsers = [...users, newUser]
      storeUsers(updatedUsers)
      
      setUser(newUser)
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser))
    } catch (error) {
      console.error("Erro no registo:", error)
      throw error
    }
  }

  const login = async (email: string, password: string) => {
    try {
      // Verificar credenciais de admin específicas
      if (email === "admin@leiriagenda.pt" && password === "leiriagenda2025") {
        setUser(DEFAULT_ADMIN_USER)
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(DEFAULT_ADMIN_USER))
        return
      }

      const users = getStoredUsers()
      const foundUser = users.find(u => u.email === email)
      
      if (!foundUser) {
        throw new Error("Utilizador não encontrado")
      }

      // Simular verificação de password (em produção usaria hashing)
      // Para demo, qualquer password funciona
      
      const updatedUser = {
        ...foundUser,
        lastLogin: new Date().toISOString()
      }

      // Atualizar na lista de utilizadores
      const updatedUsers = users.map(u => u.id === foundUser.id ? updatedUser : u)
      storeUsers(updatedUsers)
      
      setUser(updatedUser)
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Erro no login:", error)
      throw error
    }
  }

  const loginWithGoogle = async () => {
    try {
      // Simular login com Google
      // Em produção, usaria a Google OAuth API
      
      const mockGoogleUser: User = {
        id: `google_${Date.now()}`,
        name: "Google User",
        email: "user@gmail.com",
        avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=GoogleUser",
        favorites: [],
        role: "user",
        provider: "google",
        joinDate: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      }

      const users = getStoredUsers()
      const existingUser = users.find(u => u.email === mockGoogleUser.email)
      
      let userToLogin: User
      
      if (existingUser) {
        // Utilizador já existe, fazer login
        userToLogin = {
          ...existingUser,
          lastLogin: new Date().toISOString()
        }
        const updatedUsers = users.map(u => u.id === existingUser.id ? userToLogin : u)
        storeUsers(updatedUsers)
      } else {
        // Criar novo utilizador
        userToLogin = mockGoogleUser
        storeUsers([...users, userToLogin])
      }
      
      setUser(userToLogin)
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userToLogin))
    } catch (error) {
      console.error("Erro no login com Google:", error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(CURRENT_USER_KEY)
  }

  const addToFavorites = (eventId: string) => {
    if (!user) return

    try {
      const updatedUser = {
        ...user,
        favorites: [...(user.favorites || []), eventId],
      }

      const users = getStoredUsers()
      const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u)
      storeUsers(updatedUsers)
      
      setUser(updatedUser)
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error)
    }
  }

  const removeFromFavorites = (eventId: string) => {
    if (!user) return

    try {
      const updatedUser = {
        ...user,
        favorites: (user.favorites || []).filter((id) => id !== eventId),
      }

      const users = getStoredUsers()
      const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u)
      storeUsers(updatedUsers)
      
      setUser(updatedUser)
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Erro ao remover favorito:", error)
    }
  }

  const isFavorite = (eventId: string) => {
    if (!user) return false
    return (user.favorites || []).includes(eventId)
  }

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return

    try {
      const updatedUser = {
        ...user,
        ...updatedData,
      }

      const users = getStoredUsers()
      const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u)
      storeUsers(updatedUsers)
      
      setUser(updatedUser)
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error)
    }
  }

  const updateAvatar = (avatarUrl: string) => {
    if (!user) return

    try {
      const updatedUser = {
        ...user,
        avatar: avatarUrl,
      }

      const users = getStoredUsers()
      const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u)
      storeUsers(updatedUsers)
      
      setUser(updatedUser)
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))
    } catch (error) {
      console.error("Erro ao atualizar avatar:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithGoogle,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        updateProfile,
        updateAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
