"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Tag, 
  DollarSign,
  X,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { useToast } from "@/contexts/toast-context"

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

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void
  onClear: () => void
  categories: string[]
  locations: string[]
}

export function AdvancedSearch({ onSearch, onClear, categories, locations }: AdvancedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "all",
    location: "all",
    dateRange: "all",
    priceRange: [0, 100],
    isFree: false,
    hasImage: false,
    sortBy: "date"
  })
  const [activeFilters, setActiveFilters] = useState(0)
  const { addToast } = useToast()

  useEffect(() => {
    // Count active filters
    let count = 0
    if (filters.query) count++
    if (filters.category !== "all") count++
    if (filters.location !== "all") count++
    if (filters.dateRange !== "all") count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 100) count++
    if (filters.isFree) count++
    if (filters.hasImage) count++
    if (filters.sortBy !== "date") count++
    
    setActiveFilters(count)
  }, [filters])

  const handleSearch = () => {
    if (!filters.query && filters.category === "all" && filters.location === "all") {
      addToast("Adicione pelo menos um critério de pesquisa", "info")
      return
    }
    
    onSearch(filters)
    addToast("Pesquisa realizada com sucesso!", "success")
  }

  const handleClear = () => {
    setFilters({
      query: "",
      category: "all",
      location: "all",
      dateRange: "all",
      priceRange: [0, 100],
      isFree: false,
      hasImage: false,
      sortBy: "date"
    })
    onClear()
    addToast("Filtros limpos!", "info")
  }

  const handleQuickFilter = (type: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const getDateRangeLabel = (range: string) => {
    switch (range) {
      case "today": return "Hoje"
      case "tomorrow": return "Amanhã"
      case "week": return "Esta Semana"
      case "month": return "Este Mês"
      case "next-month": return "Próximo Mês"
      default: return "Todas as Datas"
    }
  }

  const getSortByLabel = (sort: string) => {
    switch (sort) {
      case "date": return "Data"
      case "price": return "Preço"
      case "popularity": return "Popularidade"
      case "name": return "Nome"
      default: return "Data"
    }
  }

  return (
    <Card className="w-full border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              <Filter className="h-4 w-4 mr-2 text-primary/60" />
              Filtros Avançados
            </CardTitle>
            <CardDescription className="text-sm">
              {activeFilters > 0 ? `${activeFilters} filtro(s) ativo(s)` : "Personalize a sua pesquisa"}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary/60 hover:text-foreground"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Ocultar
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                Mostrar
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Basic Filters - Always Visible */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium mb-2 block text-primary/70">Categoria</label>
            <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block text-primary/70">Localização</label>
            <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Todas as localizações" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Localizações</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block text-primary/70">Período</label>
            <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Datas</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="tomorrow">Amanhã</SelectItem>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
                <SelectItem value="next-month">Próximo Mês</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters - Collapsible */}
        {isExpanded && (
          <div className="space-y-4 border-t pt-4">
            {/* Price Range */}
            <div>
              <label className="text-sm font-medium mb-3 block text-primary/70">
                Faixa de Preço: €{filters.priceRange[0]} - €{filters.priceRange[1]}
              </label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-primary/50 mt-2">
                <span>Grátis</span>
                <span>€100+</span>
              </div>
            </div>

            {/* Additional Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isFree"
                  checked={filters.isFree}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, isFree: checked as boolean }))}
                />
                <label htmlFor="isFree" className="text-sm font-medium text-primary/70">
                  Apenas Eventos Gratuitos
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasImage"
                  checked={filters.hasImage}
                  onCheckedChange={(checked) => setFilters(prev => ({ ...prev, hasImage: checked as boolean }))}
                />
                <label htmlFor="hasImage" className="text-sm font-medium text-primary/70">
                  Com Imagem
                </label>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-primary/70">Ordenar por</label>
                <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Data</SelectItem>
                    <SelectItem value="price">Preço</SelectItem>
                    <SelectItem value="popularity">Popularidade</SelectItem>
                    <SelectItem value="name">Nome</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button onClick={handleSearch} className="flex-1 bg-primary hover:bg-accent text-white hover:text-accent-foreground">
            <Search className="h-4 w-4 mr-2" />
            Pesquisar ({activeFilters} filtros)
          </Button>
          
          <Button variant="outline" onClick={handleClear}>
            <X className="h-4 w-4 mr-2" />
            Limpar Filtros
          </Button>
        </div>

        {/* Active Filters Display - Compact */}
        {activeFilters > 0 && (
          <div className="pt-3 border-t mt-4">
            <h4 className="text-xs font-medium mb-2 text-primary/60">Filtros Ativos:</h4>
            <div className="flex flex-wrap gap-1">
              {filters.query && (
                <Badge variant="secondary" className="bg-brown-muted text-brown-dark border-brown-primary text-xs">
                  Pesquisa: "{filters.query}"
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, query: "" }))}
                    className="ml-1 hover:text-brown-dark"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
               
              {filters.category !== "all" && (
                <Badge variant="secondary" className="bg-brown-muted text-brown-dark border-brown-primary text-xs">
                  {filters.category}
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, category: "all" }))}
                    className="ml-1 hover:text-brown-dark"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
               
              {filters.location !== "all" && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
                  {filters.location}
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, location: "all" }))}
                    className="ml-1 hover:text-purple-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
               
              {filters.dateRange !== "all" && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                  {getDateRangeLabel(filters.dateRange)}
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, dateRange: "all" }))}
                    className="ml-1 hover:text-orange-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
               
              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 100) && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                  €{filters.priceRange[0]}-{filters.priceRange[1]}
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, priceRange: [0, 100] }))}
                    className="ml-1 hover:text-yellow-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
               
              {filters.isFree && (
                <Badge variant="secondary" className="bg-brown-muted text-brown-dark border-brown-primary text-xs">
                  Apenas Gratuitos
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, isFree: false }))}
                    className="ml-1 hover:text-brown-dark"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
               
              {filters.hasImage && (
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 border-indigo-200 text-xs">
                  Com Imagem
                  <button
                    onClick={() => setFilters(prev => ({ ...prev, hasImage: false }))}
                    className="ml-1 hover:text-indigo-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
