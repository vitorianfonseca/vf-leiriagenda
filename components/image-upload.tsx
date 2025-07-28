"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Camera, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/contexts/toast-context"

interface ImageUploadProps {
  currentImage?: string
  onImageChange: (imageUrl: string) => void
  size?: "sm" | "md" | "lg"
  className?: string
  fallbackText?: string
  disabled?: boolean // Nova prop para controlar se está desabilitado
}

export function ImageUpload({
  currentImage,
  onImageChange,
  size = "lg",
  className = "",
  fallbackText = "U",
  disabled = false, // Padrão é false (habilitado)
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addToast } = useToast()

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24",
  }

  const buttonSizeClasses = {
    sm: "w-6 h-6",
    md: "w-7 h-7",
    lg: "w-8 h-8",
  }

  const iconSizeClasses = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4",
  }

  const handleFileSelect = () => {
    if (disabled) return
    fileInputRef.current?.click()
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return

    const file = event.target.files?.[0]
    if (!file) return

    // Validar tipo de arquivo
    if (!file.type.startsWith("image/")) {
      addToast("Por favor selecione apenas ficheiros de imagem", "error")
      return
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      addToast("A imagem deve ter menos de 5MB", "error")
      return
    }

    setIsUploading(true)

    try {
      // Converter para base64 para preview imediato
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreviewUrl(result)
        onImageChange(result)
        addToast("Imagem carregada com sucesso!", "success")
      }
      reader.readAsDataURL(file)
    } catch (error) {
      addToast("Erro ao carregar imagem. Tente novamente.", "error")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    if (disabled) return

    setPreviewUrl(null)
    onImageChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    addToast("Imagem removida", "info")
  }

  return (
    <div className={`relative ${className}`}>
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={previewUrl || currentImage || "/placeholder.svg"} alt="Profile" />
        <AvatarFallback className="bg-[#C17C5D] text-white text-2xl">{fallbackText}</AvatarFallback>
      </Avatar>

      {/* Upload Button - só aparece se não estiver desabilitado */}
      {!disabled && (
        <Button
          type="button"
          size="sm"
          onClick={handleFileSelect}
          disabled={isUploading}
          className={`absolute -bottom-2 -right-2 rounded-full ${buttonSizeClasses[size]} p-0 bg-[#C17C5D] hover:bg-[#A66A4D]`}
        >
          {isUploading ? (
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
          ) : (
            <Camera className={iconSizeClasses[size]} />
          )}
        </Button>
      )}

      {/* Remove Button - só aparece se não estiver desabilitado e houver imagem */}
      {!disabled && previewUrl && (
        <Button
          type="button"
          size="sm"
          onClick={handleRemoveImage}
          className={`absolute -top-2 -right-2 rounded-full ${buttonSizeClasses[size]} p-0 bg-red-500 hover:bg-red-600`}
        >
          <X className={iconSizeClasses[size]} />
        </Button>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
    </div>
  )
}
