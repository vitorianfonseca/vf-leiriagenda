"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Heart, Music, Palette, Hammer, TreePine, Users, Camera, Utensils, Gamepad2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useState, useEffect } from "react"
import { useToast } from "@/contexts/toast-context"

interface EventCardProps {
  id: string
  title: string
  date: string
  time: string
  location: string
  image: string
  price: string
  category: string
  isFree: boolean
}

export function EventCard({ id, title, date, time, location, image, price, category, isFree }: EventCardProps) {
  const { isAuthenticated, isFavorite, addToFavorites, removeFromFavorites } = useAuth()
  const [isFavorited, setIsFavorited] = useState(false)
  const { addToast } = useToast()

  // Função para obter o ícone baseado na categoria
  const getCategoryIcon = (category: string) => {
    const normalizedCategory = category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    
    switch (normalizedCategory) {
      case 'musica':
      case 'música':
        return Music
      case 'cultura':
      case 'arte':
        return Palette
      case 'workshop':
        return Hammer
      case 'desporto':
      case 'natureza':
        return TreePine
      case 'social':
        return Users
      case 'fotografia':
        return Camera
      case 'gastronomia':
        return Utensils
      case 'jogos':
        return Gamepad2
      default:
        return Calendar
    }
  }

  const CategoryIcon = getCategoryIcon(category)

  useEffect(() => {
    if (isAuthenticated) {
      setIsFavorited(isFavorite(id))
    }
  }, [isAuthenticated, id, isFavorite])

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      addToast("Faça login para adicionar eventos aos favoritos", "info")
      return
    }

    try {
      // Toggle favorite status
      if (isFavorited) {
        removeFromFavorites(id)
        setIsFavorited(false)
        addToast("Evento removido dos favoritos", "success")
      } else {
        addToFavorites(id)
        setIsFavorited(true)
        addToast("Evento adicionado aos favoritos", "success")
      }
    } catch (error) {
      console.error("Erro ao gerir favoritos:", error)
      addToast("Erro ao gerir favoritos", "error")
    }
  }

  return (
    <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-border/60 bg-card">
      <div className="relative overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/95 rounded-full hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
          title={isAuthenticated ? (isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos") : "Faça login para favoritar"}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isAuthenticated && isFavorited ? "text-red-500 fill-red-500" : "text-primary/60 hover:text-red-400"
            }`}
          />
        </button>
        <Badge className={`absolute top-3 left-3 text-xs font-sans tracking-wide ${isFree ? "bg-primary/85" : "bg-primary"} text-white shadow-sm`}>
          {isFree ? "Gratuito" : price}
        </Badge>
      </div>

      <CardContent className="p-5">
        <div className="mb-3">
          <Badge variant="secondary" className="text-xs inline-flex items-center gap-1.5 w-fit font-sans bg-muted text-primary/70 border-0">
            <CategoryIcon className="h-3 w-3" />
            {category}
          </Badge>
        </div>

        <h3 className="font-display font-medium text-xl mb-3 line-clamp-2 min-h-[3.5rem] text-foreground leading-snug">
          {title}
        </h3>

        <div className="space-y-1.5 mb-5">
          <div className="flex items-center text-sm text-primary/60 font-sans">
            <Calendar className="h-3.5 w-3.5 mr-2 text-primary/40 flex-shrink-0" />
            <span className="truncate">{date} às {time}</span>
          </div>
          <div className="flex items-center text-sm text-primary/60 font-sans">
            <MapPin className="h-3.5 w-3.5 mr-2 text-primary/40 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        <Link href={`/evento/${id}`}>
          <Button className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300 font-sans text-sm tracking-wide rounded-lg">
            Ver mais
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
