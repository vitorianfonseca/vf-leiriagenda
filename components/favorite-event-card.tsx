"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Heart } from "lucide-react"
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
        <Badge className={`absolute top-3 left-3 ${isFree ? "bg-green-500" : "bg-[#D4AF37]"} text-white`}>
          {isFree ? "Gratuito" : price}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>

        <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
          {title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-[#D4AF37]" />
            <span>
              {date} às {time}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-[#D4AF37]" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <Link href={`/evento/${id}`}>
          <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white">Ver mais</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
