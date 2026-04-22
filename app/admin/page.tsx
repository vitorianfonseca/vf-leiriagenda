"use client"

import { AdminGuard } from "@/components/admin-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye, 
  Heart,
  BarChart3,
  Activity,
  Settings,
  Shield
} from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import DataService, { type Event, type User } from "@/lib/data-service"
import Link from "next/link"

interface DashboardStats {
  totalUsers: number
  totalEvents: number
  pendingEvents: number
  approvedEvents: number
  rejectedEvents: number
  totalViews: number
  totalFavorites: number
  activeUsers: number
}

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalEvents: 0,
    pendingEvents: 0,
    approvedEvents: 0,
    rejectedEvents: 0,
    totalViews: 0,
    totalFavorites: 0,
    activeUsers: 0
  })
  const [recentEvents, setRecentEvents] = useState<Event[]>([])
  const [recentUsers, setRecentUsers] = useState<User[]>([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = () => {
    const events = DataService.getEvents()
    const users = DataService.getUsers()

    const pendingEvents = events.filter(e => e.status === "pending")
    const approvedEvents = events.filter(e => e.status === "approved")
    const rejectedEvents = events.filter(e => e.status === "rejected")

    const totalViews = events.reduce((sum, e) => sum + e.views, 0)
    const totalFavorites = events.reduce((sum, e) => sum + e.favorites, 0)

    setStats({
      totalUsers: users.length,
      totalEvents: events.length,
      pendingEvents: pendingEvents.length,
      approvedEvents: approvedEvents.length,
      rejectedEvents: rejectedEvents.length,
      totalViews,
      totalFavorites,
      activeUsers: users.filter(u => u.status === "active").length
    })

    setRecentEvents(events.slice(0, 5))
    setRecentUsers(users.slice(0, 5))
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
        return <Activity className="h-4 w-4 text-primary/60" />
    }
  }

  return (
    <AdminGuard>
      <div className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Administrativo</h1>
            <p className="text-primary/60">
              Bem-vindo, {user?.name}! Gerencie a sua plataforma LeiriAgenda
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Utilizadores</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.activeUsers} ativos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Eventos</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalEvents}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.pendingEvents} pendentes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  +12% este mês
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Favoritos</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalFavorites}</div>
                <p className="text-xs text-muted-foreground">
                  +8% esta semana
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="events">Eventos</TabsTrigger>
              <TabsTrigger value="users">Utilizadores</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Events */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Eventos Recentes
                    </CardTitle>
                    <CardDescription>
                      Últimos eventos submetidos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentEvents.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(event.status)}
                            <div>
                              <p className="font-medium text-sm">{event.title}</p>
                              <p className="text-xs text-primary/50">{event.organizer}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(event.status)}
                            <Link href={`/admin/events/${event.id}`}>
                              <Button size="sm" variant="outline">Ver</Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link href="/admin/events">
                        <Button variant="outline" className="w-full">
                          Ver Todos os Eventos
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Users */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Utilizadores Recentes
                    </CardTitle>
                    <CardDescription>
                      Últimos utilizadores registados
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {user.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-sm">{user.name}</p>
                              <p className="text-xs text-primary/50">{user.email}</p>
                            </div>
                          </div>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link href="/admin/users">
                        <Button variant="outline" className="w-full">
                          Ver Todos os Utilizadores
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestão de Eventos</CardTitle>
                  <CardDescription>
                    Aprove, rejeite ou edite eventos submetidos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted/40">
                        Todos ({stats.totalEvents})
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-yellow-100">
                        Pendentes ({stats.pendingEvents})
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-green-100">
                        Aprovados ({stats.approvedEvents})
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer hover:bg-red-100">
                        Rejeitados ({stats.rejectedEvents})
                      </Badge>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Evento</TableHead>
                          <TableHead>Organizador</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Visualizações</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentEvents.map((event) => (
                          <TableRow key={event.id}>
                            <TableCell className="font-medium">{event.title}</TableCell>
                            <TableCell>{event.organizer}</TableCell>
                            <TableCell>{event.date}</TableCell>
                            <TableCell>{getStatusBadge(event.status)}</TableCell>
                            <TableCell>{event.views}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  Ver
                                </Button>
                                {event.status === "pending" && (
                                  <>
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                      Aprovar
                                    </Button>
                                    <Button size="sm" variant="destructive">
                                      Rejeitar
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestão de Utilizadores</CardTitle>
                  <CardDescription>
                    Gerencie contas de utilizadores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Utilizador</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Função</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data de Registo</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.status === "active" ? "default" : "secondary"}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                Ver
                              </Button>
                              <Button size="sm" variant="outline">
                                Editar
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Estatísticas de Eventos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Eventos Aprovados</span>
                        <span className="font-bold text-green-600">{stats.approvedEvents}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Eventos Pendentes</span>
                        <span className="font-bold text-yellow-600">{stats.pendingEvents}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Eventos Rejeitados</span>
                        <span className="font-bold text-red-600">{stats.rejectedEvents}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Métricas de Engajamento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Total de Visualizações</span>
                        <span className="font-bold">{stats.totalViews.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Total de Favoritos</span>
                        <span className="font-bold">{stats.totalFavorites}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Utilizadores Ativos</span>
                        <span className="font-bold">{stats.activeUsers}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Link href="/admin/events">
                    <Button variant="outline" className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Gerir Eventos
                    </Button>
                  </Link>
                  <Link href="/admin/users">
                    <Button variant="outline" className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      Gerir Utilizadores
                    </Button>
                  </Link>
                  <Link href="/admin/settings">
                    <Button variant="outline" className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Configurações
                    </Button>
                  </Link>
                  <Link href="/admin/security">
                    <Button variant="outline" className="flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      Segurança
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminGuard>
  )
}
