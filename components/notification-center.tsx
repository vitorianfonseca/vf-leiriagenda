"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Bell, 
  Check, 
  Trash2, 
  Settings, 
  MessageCircle, 
  Calendar, 
  Users, 
  AlertTriangle,
  Info,
  X
} from "lucide-react"
import { useNotifications, type Notification } from "@/contexts/notification-context"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"

interface NotificationCenterProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    clearAllNotifications,
    requestPermission,
    hasPermission,
    isPushSupported
  } = useNotifications()

  const [activeTab, setActiveTab] = useState<"all" | "unread" | "events" | "social">("all")

  const filteredNotifications = notifications.filter(notification => {
    switch (activeTab) {
      case "unread":
        return !notification.isRead
      case "events":
        return notification.category === "event" || notification.category === "reminder"
      case "social":
        return notification.category === "social"
      default:
        return true
    }
  })

  const getNotificationIcon = (category: Notification["category"], type: Notification["type"]) => {
    switch (category) {
      case "event":
        return <Calendar className="h-4 w-4" />
      case "reminder":
        return <AlertTriangle className="h-4 w-4" />
      case "social":
        return <Users className="h-4 w-4" />
      case "system":
        return <Settings className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getNotificationColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "text-green-600 bg-green-50 border-green-200"
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "error":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-blue-600 bg-blue-50 border-blue-200"
    }
  }

  const formatNotificationTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { 
        addSuffix: true, 
        locale: ptBR 
      })
    } catch {
      return "há pouco tempo"
    }
  }

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id)
    }
    
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl
    }
    
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          {/* Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Notificações
                  </h3>
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {unreadCount} não lidas
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {!hasPermission && isPushSupported && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={requestPermission}
                    className="text-xs"
                  >
                    Ativar Push
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: "all", label: "Todas", count: notifications.length },
                { id: "unread", label: "Não Lidas", count: unreadCount },
                { id: "events", label: "Eventos", count: notifications.filter(n => n.category === "event" || n.category === "reminder").length },
                { id: "social", label: "Social", count: notifications.filter(n => n.category === "social").length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {tab.count}
                    </Badge>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Actions */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Marcar como Lidas
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={clearAllNotifications}
                  disabled={notifications.length === 0}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Limpar Todas
                </Button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {activeTab === "all" 
                    ? "Não há notificações" 
                    : `Não há notificações ${activeTab === "unread" ? "não lidas" : activeTab === "events" ? "de eventos" : "sociais"}`
                  }
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.isRead ? "bg-blue-50" : ""
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                        {getNotificationIcon(notification.category, notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${
                              !notification.isRead ? "text-gray-900" : "text-gray-700"
                            }`}>
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <span className="text-xs text-gray-500">
                                {formatNotificationTime(notification.createdAt)}
                              </span>
                              {!notification.isRead && (
                                <Badge variant="secondary" className="text-xs">
                                  Nova
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notification.id)
                          }}
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
