"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Heart, Music, Palette, Hammer, TreePine, Users, Camera, Utensils, Gamepad2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface FavoriteEventCardProps {
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

export function FavoriteEventCard({
  id,
  title,
  date,
  time,
  location,
  image,
  price,
  category,
  isFree,
}: FavoriteEventCardProps) {
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
  const { removeFromFavorites } = useAuth()

  const handleRemoveFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    removeFromFavorites(id)
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleRemoveFavorite}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
          title="Remover dos favoritos"
        >
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
        </button>
        <Badge className={`absolute top-3 left-3 ${isFree ? "bg-palette-rose-warm" : "bg-primary"} text-white`}>
          {isFree ? "Gratuito" : price}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs inline-flex items-center gap-1 w-fit">
            <CategoryIcon className="h-3 w-3" />
            {category}
          </Badge>
        </div>

        <h3 className="font-semibold text-lg mb-3 line-clamp-2">
          {title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-primary/60">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span>
              {date} às {time}
            </span>
          </div>
          <div className="flex items-center text-sm text-primary/60">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <Link href={`/evento/${id}`}>
          <Button className="w-full bg-primary hover:bg-accent text-white hover:text-accent-foreground transition-all duration-300">Ver mais</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
