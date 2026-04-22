"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, FileImage } from "lucide-react"
import { useToast } from "@/contexts/toast-context"

interface FileUploadZoneProps {
  onFileSelect: (file: File, previewUrl: string) => void
  currentImage?: string
  className?: string
  maxSize?: number // em MB
  acceptedTypes?: string[]
}

export function FileUploadZone({
  onFileSelect,
  currentImage,
  className = "",
  maxSize = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addToast } = useToast()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = async (file: File) => {
    // Validações
    if (!acceptedTypes.includes(file.type)) {
      addToast("Tipo de ficheiro não suportado. Use JPG, PNG, WebP ou GIF.", "error")
      return
    }

    if (file.size > maxSize * 1024 * 1024) {
      addToast(`A imagem deve ter menos de ${maxSize}MB`, "error")
      return
    }

    setIsUploading(true)

    try {
      // Criar preview
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreviewUrl(result)
        onFileSelect(file, result)
        addToast("Imagem carregada com sucesso!", "success")
      }
      reader.readAsDataURL(file)
    } catch (error) {
      addToast("Erro ao processar imagem", "error")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    addToast("Imagem removida", "info")
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={className}>
      {previewUrl ? (
        // Preview da imagem
        <div className="relative">
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border-2 border-border"
          />
          <Button
            type="button"
            size="sm"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 rounded-full w-8 h-8 p-0 bg-red-500 hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        // Zona de upload
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${
              isDragging
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary hover:bg-muted/40"
            }
          `}
        >
          {isUploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-primary/60">A carregar imagem...</p>
            </div>
          ) : (
            <>
              <FileImage className="h-12 w-12 text-primary/40 mx-auto mb-4" />
              <p className="text-primary/60 mb-2">Arraste uma imagem ou clique para selecionar</p>
              <p className="text-sm text-primary/50 mb-4">PNG, JPG, WebP ou GIF até {maxSize}MB</p>
              <Button type="button" variant="outline" className="bg-transparent">
                <Upload className="h-4 w-4 mr-2" />
                Selecionar Imagem
              </Button>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  )
}
