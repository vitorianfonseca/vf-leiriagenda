"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useToast } from "./toast-context"

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  category: "event" | "system" | "social" | "reminder"
  isRead: boolean
  createdAt: string
  actionUrl?: string
  eventId?: string
  userId?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "isRead">) => void
  markAsRead: (notificationId: string) => void
  markAllAsRead: () => void
  deleteNotification: (notificationId: string) => void
  clearAllNotifications: () => void
  requestPermission: () => Promise<boolean>
  sendPushNotification: (title: string, options?: NotificationOptions) => void
  isPushSupported: boolean
  hasPermission: boolean
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [hasPermission, setHasPermission] = useState(false)
  const { addToast } = useToast()

  const isPushSupported = typeof window !== "undefined" && "Notification" in window

  useEffect(() => {
    loadNotifications()
    checkPermission()
  }, [])

  const loadNotifications = () => {
    try {
      const stored = localStorage.getItem("leiriagenda_notifications")
      if (stored) {
        setNotifications(JSON.parse(stored))
      }
    } catch (error) {
      console.error("Erro ao carregar notificações:", error)
    }
  }

  const saveNotifications = (newNotifications: Notification[]) => {
    try {
      localStorage.setItem("leiriagenda_notifications", JSON.stringify(newNotifications))
      setNotifications(newNotifications)
    } catch (error) {
      console.error("Erro ao guardar notificações:", error)
    }
  }

  const checkPermission = () => {
    if (isPushSupported) {
      setHasPermission(Notification.permission === "granted")
    }
  }

  const requestPermission = async (): Promise<boolean> => {
    if (!isPushSupported) {
      addToast("Notificações push não são suportadas neste navegador", "warning")
      return false
    }

    try {
      const permission = await Notification.requestPermission()
      const granted = permission === "granted"
      setHasPermission(granted)
      
      if (granted) {
        addToast("Notificações push ativadas com sucesso!", "success")
      } else {
        addToast("Permissão para notificações push negada", "warning")
      }
      
      return granted
    } catch (error) {
      console.error("Erro ao solicitar permissão:", error)
      addToast("Erro ao solicitar permissão para notificações", "error")
      return false
    }
  }

  const addNotification = (notificationData: Omit<Notification, "id" | "createdAt" | "isRead">) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isRead: false
    }

    const updatedNotifications = [newNotification, ...notifications]
    saveNotifications(updatedNotifications)

    // Enviar notificação push se permitido
    if (hasPermission && notificationData.type !== "info") {
      sendPushNotification(notificationData.title, {
        body: notificationData.message,
        icon: "/placeholder-logo.png",
        badge: "/placeholder-logo.png",
        tag: notificationData.id,
        data: {
          url: notificationData.actionUrl,
          eventId: notificationData.eventId
        }
      })
    }

    // Mostrar toast para notificações importantes
    if (notificationData.type === "error" || notificationData.type === "warning") {
      addToast(notificationData.message, notificationData.type)
    }
  }

  const markAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    )
    saveNotifications(updatedNotifications)
  }

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      isRead: true
    }))
    saveNotifications(updatedNotifications)
    addToast("Todas as notificações marcadas como lidas", "success")
  }

  const deleteNotification = (notificationId: string) => {
    const updatedNotifications = notifications.filter(
      notification => notification.id !== notificationId
    )
    saveNotifications(updatedNotifications)
  }

  const clearAllNotifications = () => {
    saveNotifications([])
    addToast("Todas as notificações foram eliminadas", "success")
  }

  const sendPushNotification = (title: string, options?: NotificationOptions) => {
    if (!isPushSupported || !hasPermission) return

    try {
      const notification = new Notification(title, options)
      
      notification.onclick = () => {
        if (options?.data?.url) {
          window.focus()
          window.location.href = options.data.url
        }
        notification.close()
      }

      // Auto-close após 5 segundos
      setTimeout(() => {
        notification.close()
      }, 5000)
    } catch (error) {
      console.error("Erro ao enviar notificação push:", error)
    }
  }

  const unreadCount = notifications.filter(notification => !notification.isRead).length

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    requestPermission,
    sendPushNotification,
    isPushSupported,
    hasPermission
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

// Funções utilitárias para criar notificações específicas
export const createEventNotification = (
  eventTitle: string,
  message: string,
  eventId: string,
  type: Notification["type"] = "info"
): Omit<Notification, "id" | "createdAt" | "isRead"> => ({
  title: `Evento: ${eventTitle}`,
  message,
  type,
  category: "event",
  actionUrl: `/evento/${eventId}`,
  eventId
})

export const createReminderNotification = (
  eventTitle: string,
  eventTime: string,
  eventId: string
): Omit<Notification, "id" | "createdAt" | "isRead"> => ({
  title: "Lembrete de Evento",
  message: `O evento "${eventTitle}" começa às ${eventTime}. Não se esqueça!`,
  type: "warning",
  category: "reminder",
  actionUrl: `/evento/${eventId}`,
  eventId
})

export const createSocialNotification = (
  userName: string,
  action: string,
  eventTitle: string,
  eventId: string
): Omit<Notification, "id" | "createdAt" | "isRead"> => ({
  title: "Atividade Social",
  message: `${userName} ${action} no evento "${eventTitle}"`,
  type: "info",
  category: "social",
  actionUrl: `/evento/${eventId}`,
  eventId
})
