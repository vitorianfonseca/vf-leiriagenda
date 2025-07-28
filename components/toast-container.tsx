"use client"

import { useToast } from "@/contexts/toast-context"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  const getToastIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getToastStyles = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800"
      case "error":
        return "bg-red-50 border-red-200 text-red-800"
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800"
      default:
        return "bg-blue-50 border-blue-200 text-blue-800"
    }
  }

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center p-4 rounded-lg border shadow-lg max-w-sm animate-in slide-in-from-right-full ${getToastStyles(toast.type)}`}
        >
          {getToastIcon(toast.type)}
          <span className="ml-3 flex-1 text-sm font-medium">{toast.message}</span>
          <Button
            variant="ghost"
            size="sm"
            className="ml-2 h-6 w-6 p-0 hover:bg-transparent"
            onClick={() => removeToast(toast.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  )
}
