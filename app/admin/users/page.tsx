"use client"

import { AdminGuard } from "@/components/admin-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Shield,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  MapPin,
  Globe,
  Phone,
  Activity
} from "lucide-react"
import { useState, useEffect } from "react"
import DataService, { type User } from "@/lib/data-service"
import { useToast } from "@/contexts/toast-context"
import Link from "next/link"

interface UserFilters {
  role: string
  status: string
  search: string
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [filters, setFilters] = useState<UserFilters>({
    role: "all",
    status: "all",
    search: ""
  })
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { addToast } = useToast()

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, users])

  const loadUsers = () => {
    const allUsers = DataService.getUsers()
    setUsers(allUsers)
  }

  const applyFilters = () => {
    let filtered = [...users]

    // Filter by role
    if (filters.role !== "all") {
      filtered = filtered.filter(user => user.role === filters.role)
    }

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter(user => user.status === filters.status)
    }

    // Filter by search
    if (filters.search) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        (user.location && user.location.toLowerCase().includes(filters.search.toLowerCase()))
      )
    }

    setFilteredUsers(filtered)
  }

  const handleStatusChange = async (userId: string, newStatus: "active" | "inactive" | "suspended") => {
    try {
      DataService.updateUser(userId, { status: newStatus })
      loadUsers()
      
      const statusText = newStatus === "active" ? "ativado" : newStatus === "inactive" ? "desativado" : "suspenso"
      addToast(`Utilizador ${statusText} com sucesso!`, "success")
    } catch (error) {
      console.error("Erro ao alterar status:", error)
      addToast("Erro ao alterar status do utilizador", "error")
    }
  }

  const handleRoleChange = async (userId: string, newRole: "user" | "moderator" | "admin") => {
    try {
      DataService.updateUser(userId, { role: newRole })
      loadUsers()
      
      addToast(`Função do utilizador alterada para ${newRole}!`, "success")
    } catch (error) {
      console.error("Erro ao alterar função:", error)
      addToast("Erro ao alterar função do utilizador", "error")
    }
  }

  const handleDeleteUser = async (userId: string) => {
    const user = users.find(u => u.id === userId)
    if (user?.role === "admin") {
      addToast("Não é possível eliminar um administrador", "error")
      return
    }

    if (confirm("Tem certeza que quer eliminar este utilizador? Esta ação não pode ser desfeita.")) {
      try {
        DataService.deleteUser(userId)
        loadUsers()
        addToast("Utilizador eliminado com sucesso!", "success")
      } catch (error) {
        console.error("Erro ao eliminar utilizador:", error)
        addToast("Erro ao eliminar utilizador", "error")
      }
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Administrador</Badge>
      case "moderator":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Moderador</Badge>
      case "user":
        return <Badge className="bg-muted/40 text-foreground border-border">Utilizador</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Ativo</Badge>
      case "inactive":
        return <Badge className="bg-muted/40 text-foreground border-border">Inativo</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Suspenso</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <UserCheck className="h-4 w-4 text-green-600" />
      case "inactive":
        return <UserX className="h-4 w-4 text-primary/60" />
      case "suspended":
        return <UserX className="h-4 w-4 text-red-600" />
      default:
        return <Users className="h-4 w-4 text-primary/60" />
    }
  }

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    inactive: users.filter(u => u.status === "inactive").length,
    suspended: users.filter(u => u.status === "suspended").length,
    admins: users.filter(u => u.role === "admin").length,
    moderators: users.filter(u => u.role === "moderator").length,
    regularUsers: users.filter(u => u.role === "user").length
  }

  return (
    <AdminGuard>
      <div className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Gestão de Utilizadores</h1>
                <p className="text-primary/60">
                  Gerencie contas, permissões e estatísticas de utilizadores
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
                <CardTitle className="text-sm font-medium">Total de Utilizadores</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ativos</CardTitle>
                <UserCheck className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Administradores</CardTitle>
                <Shield className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.admins}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Moderadores</CardTitle>
                <Shield className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.moderators}</div>
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
                      placeholder="Pesquisar utilizadores..."
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Função</label>
                  <Select value={filters.role} onValueChange={(value) => setFilters(prev => ({ ...prev, role: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as funções" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as Funções</SelectItem>
                      <SelectItem value="admin">Administradores</SelectItem>
                      <SelectItem value="moderator">Moderadores</SelectItem>
                      <SelectItem value="user">Utilizadores</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="active">Ativos</SelectItem>
                      <SelectItem value="inactive">Inativos</SelectItem>
                      <SelectItem value="suspended">Suspensos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Utilizadores</CardTitle>
              <CardDescription>
                {filteredUsers.length} utilizador(es) encontrado(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Utilizador</TableHead>
                    <TableHead>Contacto</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Atividade</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {user.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-primary/50">ID: {user.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-primary/40" />
                            <span className="text-sm">{user.email}</span>
                          </div>
                          {user.phone && (
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-primary/40" />
                              <span className="text-sm">{user.phone}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {user.location && (
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-primary/40" />
                              <span className="text-sm">{user.location}</span>
                            </div>
                          )}
                          {user.website && (
                            <div className="flex items-center space-x-2">
                              <Globe className="h-4 w-4 text-primary/40" />
                              <span className="text-sm max-w-[120px] truncate">{user.website}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-primary/40" />
                          {getRoleBadge(user.role)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(user.status)}
                          {getStatusBadge(user.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-primary/40" />
                            <span>Registo: {user.joinDate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Activity className="h-4 w-4 text-primary/40" />
                            <span>Última: {user.lastActive}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          {user.role !== "admin" && (
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-primary/40 mx-auto mb-4" />
                  <p className="text-primary/50">Nenhum utilizador encontrado com os filtros atuais</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Role Management */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Gestão de Funções</CardTitle>
              <CardDescription>
                Altere funções e status dos utilizadores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Alterar Função</h4>
                  <div className="space-y-3">
                    {filteredUsers.filter(u => u.role !== "admin").map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-primary/50">{user.email}</p>
                        </div>
                        <Select 
                          value={user.role} 
                          onValueChange={(value) => handleRoleChange(user.id, value as "user" | "moderator" | "admin")}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">Utilizador</SelectItem>
                            <SelectItem value="moderator">Moderador</SelectItem>
                            <SelectItem value="admin">Administrador</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Alterar Status</h4>
                  <div className="space-y-3">
                    {filteredUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-primary/50">{user.email}</p>
                        </div>
                        <Select 
                          value={user.status} 
                          onValueChange={(value) => handleStatusChange(user.id, value as "active" | "inactive" | "suspended")}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Ativo</SelectItem>
                            <SelectItem value="inactive">Inativo</SelectItem>
                            <SelectItem value="suspended">Suspenso</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminGuard>
  )
}
