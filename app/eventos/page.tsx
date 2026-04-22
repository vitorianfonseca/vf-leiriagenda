"use client"

import { useState, useEffect } from "react"
import { EventCard } from "@/components/event-card"
import { AdvancedSearch } from "@/components/advanced-search"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, 
  MapPin, 
  Filter, 
  Grid3X3, 
  List, 
  Eye,
  Heart,
  Users,
  Clock,
  Search
} from "lucide-react"
import DataService, { type Event } from "@/lib/data-service"
import { useToast } from "@/contexts/toast-context"
import Link from "next/link"

interface SearchFilters {
  query: string
  category: string
  location: string
  dateRange: string
  priceRange: [number, number]
  isFree: boolean
  hasImage: boolean
  sortBy: string
}

export default function EventosPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeFilters, setActiveFilters] = useState<SearchFilters | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const { addToast } = useToast()

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = () => {
    try {
      const allEvents = DataService.getEvents()
      // Filter only approved events for public view
      const approvedEvents = allEvents.filter(event => event.status === "approved")
      setEvents(approvedEvents)
      setFilteredEvents(approvedEvents)
      setIsLoading(false)
    } catch (error) {
      console.error("Erro ao carregar eventos:", error)
      addToast("Erro ao carregar eventos", "error")
      setIsLoading(false)
    }
  }

  const handleSearch = (filters: SearchFilters) => {
    setActiveFilters(filters)
    let filtered = [...events]

    // Text search
    if (filters.query) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.query.toLowerCase()) ||
        event.organizer.toLowerCase().includes(filters.query.toLowerCase()) ||
        event.location.toLowerCase().includes(filters.query.toLowerCase())
      )
    }

    // Category filter
    if (filters.category !== "all") {
      filtered = filtered.filter(event => event.category === filters.category)
    }

    // Location filter
    if (filters.location !== "all") {
      filtered = filtered.filter(event => event.location === filters.location)
    }

    // Date range filter
    if (filters.dateRange !== "all") {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date)
        
        switch (filters.dateRange) {
          case "today":
            return eventDate.toDateString() === today.toDateString()
          case "tomorrow":
            return eventDate.toDateString() === tomorrow.toDateString()
          case "week":
            const weekFromNow = new Date(today)
            weekFromNow.setDate(today.getDate() + 7)
            return eventDate >= today && eventDate <= weekFromNow
          case "month":
            const monthFromNow = new Date(today)
            monthFromNow.setMonth(today.getMonth() + 1)
            return eventDate >= today && eventDate <= monthFromNow
          case "next-month":
            const nextMonth = new Date(today)
            nextMonth.setMonth(today.getMonth() + 1)
            const monthAfterNext = new Date(today)
            monthAfterNext.setMonth(today.getMonth() + 2)
            return eventDate >= nextMonth && eventDate <= monthAfterNext
          default:
            return true
        }
      })
    }

    // Price filter
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100) {
      filtered = filtered.filter(event => {
        if (event.isFree) return filters.priceRange[0] === 0
        const price = parseFloat(event.price.replace(/[^0-9.]/g, "")) || 0
        return price >= filters.priceRange[0] && price <= filters.priceRange[1]
      })
    }

    // Free events filter
    if (filters.isFree) {
      filtered = filtered.filter(event => event.isFree)
    }

    // Has image filter
    if (filters.hasImage) {
      filtered = filtered.filter(event => 
        event.image && event.image !== "/placeholder.svg?height=200&width=400&text=Evento"
      )
    }

    // Sort events
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price":
          const priceA = a.isFree ? 0 : parseFloat(a.price.replace(/[^0-9.]/g, "")) || 0
          const priceB = b.isFree ? 0 : parseFloat(b.price.replace(/[^0-9.]/g, "")) || 0
          return priceA - priceB
        case "popularity":
          return (b.favorites + b.views) - (a.favorites + a.views)
        case "name":
          return a.title.localeCompare(b.title)
        case "date":
        default:
          return new Date(a.date).getTime() - new Date(b.date).getTime()
      }
    })

    setFilteredEvents(filtered)
    addToast(`${filtered.length} evento(s) encontrado(s)`, "success")
  }

  const handleClearFilters = () => {
    setActiveFilters(null)
    setFilteredEvents(events)
    addToast("Filtros limpos!", "info")
  }

  const getCategories = () => {
    const categories = Array.from(new Set(events.map(e => e.category)))
    return categories.sort()
  }

  const getLocations = () => {
    const locations = Array.from(new Set(events.map(e => e.location)))
    return locations.sort()
  }

  const getStats = () => {
    const total = events.length
    const free = events.filter(e => e.isFree).length
    const thisWeek = events.filter(e => {
      const eventDate = new Date(e.date)
      const weekFromNow = new Date()
      weekFromNow.setDate(weekFromNow.getDate() + 7)
      return eventDate >= new Date() && eventDate <= weekFromNow
    }).length
    const totalViews = events.reduce((sum, e) => sum + e.views, 0)
    const totalFavorites = events.reduce((sum, e) => sum + e.favorites, 0)

    return { total, free, thisWeek, totalViews, totalFavorites }
  }

  const stats = getStats()

  if (isLoading) {
    return (
      <div className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-primary/40 mx-auto mb-4 animate-spin" />
            <p className="text-primary/50">A carregar eventos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Compact Header with Stats */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">Eventos em Leiria</h1>
              <p className="text-primary/60 text-sm">
                {filteredEvents.length} evento(s) encontrado(s)
              </p>
            </div>
            
            {/* Compact Stats Row */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-primary/50" />
                <span className="text-primary/60">{stats.total}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary/50" />
                <span className="text-primary/60">{stats.thisWeek}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-primary/50" />
                <span className="text-primary/60">{stats.free}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Search Bar */}
        <div className="mb-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                {/* Quick Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/40" />
                  <input
                    type="text"
                    placeholder="Pesquisar eventos, organizadores, descrições..."
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    onChange={(e) => {
                      if (e.target.value) {
                        handleSearch({ ...activeFilters, query: e.target.value } as SearchFilters)
                      } else {
                        handleClearFilters()
                      }
                    }}
                  />
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap gap-2">
                  {getCategories().slice(0, 4).map((category) => (
                    <Button
                      key={category}
                      variant={activeFilters?.category === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSearch({ ...activeFilters, category } as SearchFilters)}
                      className="text-xs"
                    >
                      {category}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                    className="text-xs"
                  >
                    <Filter className="h-3 w-3 mr-1" />
                    {showAdvancedSearch ? "Ocultar" : "Mais"} Filtros
                  </Button>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-1 border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Active Filters Display */}
              {activeFilters && (
                <div className="mt-3 pt-3 border-t">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-primary/50">Filtros ativos:</span>
                    <div className="flex flex-wrap gap-1">
                      {activeFilters.query && (
                        <Badge variant="secondary" className="text-xs">
                          "{activeFilters.query}"
                          <button
                            onClick={() => handleSearch({ ...activeFilters, query: "" } as SearchFilters)}
                            className="ml-1 hover:text-red-500"
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                      {activeFilters.category !== "all" && (
                        <Badge variant="secondary" className="text-xs">
                          {activeFilters.category}
                          <button
                            onClick={() => handleSearch({ ...activeFilters, category: "all" } as SearchFilters)}
                            className="ml-1 hover:text-red-500"
                          >
                            ×
                          </button>
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearFilters}
                        className="text-xs text-red-600 hover:text-red-700"
                      >
                        Limpar Todos
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Advanced Search (Collapsible) */}
        {showAdvancedSearch && (
          <div className="mb-6">
            <AdvancedSearch
              onSearch={handleSearch}
              onClear={handleClearFilters}
              categories={getCategories()}
              locations={getLocations()}
            />
          </div>
        )}

        {/* Events Display - Now Visible Immediately */}
        {filteredEvents.length > 0 ? (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "space-y-3"}>
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                image={event.image}
                price={event.price}
                category={event.category}
                isFree={event.isFree}
              />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="h-16 w-16 text-primary/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Nenhum evento encontrado</h3>
              <p className="text-primary/50 mb-4">
                {activeFilters ? "Tente ajustar os filtros de pesquisa" : "Não há eventos disponíveis no momento"}
              </p>
              {activeFilters && (
                <Button onClick={handleClearFilters} variant="outline">
                  Limpar Filtros
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Call to Action - Moved to bottom */}
        <div className="mt-12 text-center">
          <Card className="bg-card border border-border">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Tem um evento para partilhar?
              </h3>
              <p className="text-primary/60 mb-4 text-sm">
                Submeta o seu evento e ajude a comunidade a descobrir atividades incríveis em Leiria
              </p>
              <Link href="/submeter">
                <Button size="lg" className="bg-primary hover:bg-accent text-white hover:text-accent-foreground">
                  Submeter Evento
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
