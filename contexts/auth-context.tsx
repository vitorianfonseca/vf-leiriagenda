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
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  addToFavorites: (eventId: string) => void
  removeFromFavorites: (eventId: string) => void
  isFavorite: (eventId: string) => boolean
  updateProfile: (updatedData: Partial<User>) => void
  updateAvatar: (avatarUrl: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in (simulate checking localStorage/cookies)
    const savedUser = localStorage.getItem("leiria-agenda-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate login API call
    const mockUser = {
      id: "1",
      name: "João Silva",
      email: email,
      avatar: "/placeholder.svg?height=40&width=40&text=JS",
      favorites: ["1", "3"], // Mock favorite events
      phone: "",
      location: "Leiria, Portugal",
      bio: "",
      website: "",
    }

    setUser(mockUser)
    localStorage.setItem("leiria-agenda-user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("leiria-agenda-user")
  }

  const addToFavorites = (eventId: string) => {
    if (!user) return

    const updatedUser = {
      ...user,
      favorites: [...(user.favorites || []), eventId],
    }

    setUser(updatedUser)
    localStorage.setItem("leiria-agenda-user", JSON.stringify(updatedUser))
  }

  const removeFromFavorites = (eventId: string) => {
    if (!user) return

    const updatedUser = {
      ...user,
      favorites: (user.favorites || []).filter((id) => id !== eventId),
    }

    setUser(updatedUser)
    localStorage.setItem("leiria-agenda-user", JSON.stringify(updatedUser))
  }

  const isFavorite = (eventId: string) => {
    if (!user) return false
    return (user.favorites || []).includes(eventId)
  }

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return

    const updatedUser = {
      ...user,
      ...updatedData,
    }

    setUser(updatedUser)
    localStorage.setItem("leiria-agenda-user", JSON.stringify(updatedUser))
  }

  const updateAvatar = (avatarUrl: string) => {
    if (!user) return

    const updatedUser = {
      ...user,
      avatar: avatarUrl,
    }

    setUser(updatedUser)
    localStorage.setItem("leiria-agenda-user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
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
