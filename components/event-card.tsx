"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Heart } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useState, useEffect } from "react"

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

  useEffect(() => {
    if (isAuthenticated) {
      setIsFavorited(isFavorite(id))
    }
  }, [isAuthenticated, id, isFavorite])

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      // Don't redirect, just do nothing - user can click on Favoritos in header to see login screen
      return
    }

    // Toggle favorite status
    if (isFavorited) {
      removeFromFavorites(id)
      setIsFavorited(false)
    } else {
      addToFavorites(id)
      setIsFavorited(true)
    }
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
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isAuthenticated && isFavorited ? "text-red-500 fill-red-500" : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button>
        <Badge className={`absolute top-3 left-3 ${isFree ? "bg-green-500" : "bg-[#C17C5D]"} text-white`}>
          {isFree ? "Gratuito" : price}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>

        <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-[#C17C5D] transition-colors">
          {title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-[#C17C5D]" />
            <span>
              {date} às {time}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-[#C17C5D]" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <Link href={`/evento/${id}`}>
          <Button className="w-full bg-[#C17C5D] hover:bg-[#A66A4D] text-white">Ver mais</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
