"use client"

import { AdminGuard } from "@/components/admin-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Calendar, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Clock,
  AlertTriangle,
  MapPin,
  User,
  TrendingUp
} from "lucide-react"
import { useState, useEffect } from "react"
import DataService, { type Event } from "@/lib/data-service"
import { useToast } from "@/contexts/toast-context"
import Link from "next/link"

interface EventFilters {
  status: string
  category: string
  search: string
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [filters, setFilters] = useState<EventFilters>({
    status: "all",
    category: "all",
    search: ""
  })
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const { addToast } = useToast()

  useEffect(() => {
    loadEvents()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, events])

  const loadEvents = () => {
    const allEvents = DataService.getEvents()
    setEvents(allEvents)
  }

  const applyFilters = () => {
    let filtered = [...events]

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter(event => event.status === filters.status)
    }

    // Filter by category
    if (filters.category !== "all") {
      filtered = filtered.filter(event => event.category === filters.category)
    }

    // Filter by search
    if (filters.search) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.organizer.toLowerCase().includes(filters.search.toLowerCase()) ||
        event.location.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    setFilteredEvents(filtered)
  }

  const handleStatusChange = async (eventId: string, newStatus: "approved" | "rejected") => {
    try {
      DataService.updateEvent(eventId, { status: newStatus })
      loadEvents()
      
      const statusText = newStatus === "approved" ? "aprovado" : "rejeitado"
      addToast(`Evento ${statusText} com sucesso!`, "success")
    } catch (error) {
      console.error("Erro ao alterar status:", error)
      addToast("Erro ao alterar status do evento", "error")
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    if (confirm("Tem certeza que quer eliminar este evento? Esta ação não pode ser desfeita.")) {
      try {
        DataService.deleteEvent(eventId)
        loadEvents()
        addToast("Evento eliminado com sucesso!", "success")
      } catch (error) {
        console.error("Erro ao eliminar evento:", error)
        addToast("Erro ao eliminar evento", "error")
      }
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Aprovado</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendente</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejeitado</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "rejected":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <Calendar className="h-4 w-4 text-primary/60" />
    }
  }

  const getCategories = () => {
    const categories = Array.from(new Set(events.map(e => e.category)))
    return categories.sort()
  }

  const stats = {
    total: events.length,
    pending: events.filter(e => e.status === "pending").length,
    approved: events.filter(e => e.status === "approved").length,
    rejected: events.filter(e => e.status === "rejected").length
  }

  return (
    <AdminGuard>
      <div className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Gestão de Eventos</h1>
                <p className="text-primary/60">
                  Aprove, rejeite e gerencie todos os eventos da plataforma
                </p>
              </div>
              <Link href="/admin">
                <Button variant="outline">
                  ← Voltar ao Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Eventos</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aprovados</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rejeitados</CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filtros e Pesquisa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Pesquisar</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/40" />
                    <Input
                      placeholder="Pesquisar eventos..."
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                      <SelectItem value="approved">Aprovados</SelectItem>
                      <SelectItem value="rejected">Rejeitados</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Categoria</label>
                  <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as categorias" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as Categorias</SelectItem>
                      {getCategories().map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Events Table */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Eventos</CardTitle>
              <CardDescription>
                {filteredEvents.length} evento(s) encontrado(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento</TableHead>
                    <TableHead>Organizador</TableHead>
                    <TableHead>Local</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Métricas</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-12 h-8 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-primary/50">{event.category}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-primary/40" />
                          <span>{event.organizer}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-primary/40" />
                          <span className="max-w-[150px] truncate">{event.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-primary/40" />
                          <span>{event.date}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(event.status)}
                          {getStatusBadge(event.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4 text-primary/40" />
                            <span>{event.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4 text-primary/40" />
                            <span>{event.favorites}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          {event.status === "pending" && (
                            <>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleStatusChange(event.id, "approved")}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleStatusChange(event.id, "rejected")}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteEvent(event.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredEvents.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-primary/40 mx-auto mb-4" />
                  <p className="text-primary/50">Nenhum evento encontrado com os filtros atuais</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminGuard>
  )
}
