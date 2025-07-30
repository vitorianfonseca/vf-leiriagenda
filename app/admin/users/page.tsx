"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Users, Calendar, Search, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Mock data for users
const users = [
  {
    id: "1",
    name: "Ana Silva",
    email: "ana.silva@email.com",
    role: "Admin",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20"
  },
  {
    id: "2",
    name: "João Santos",
    email: "joao.santos@email.com",
    role: "User",
    status: "active",
    joinDate: "2024-01-18",
    lastActive: "2024-01-19"
  },
  {
    id: "3",
    name: "Maria Costa",
    email: "maria.costa@email.com",
    role: "User",
    status: "inactive",
    joinDate: "2024-01-10",
    lastActive: "2024-01-15"
  },
  {
    id: "4",
    name: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    role: "Moderator",
    status: "active",
    joinDate: "2024-01-12",
    lastActive: "2024-01-20"
  },
  {
    id: "5",
    name: "Sofia Mendes",
    email: "sofia.mendes@email.com",
    role: "User",
    status: "active",
    joinDate: "2024-01-20",
    lastActive: "2024-01-20"
  }
]

export default function UsersPage() {
  // Calculate statistics
  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === "active").length
  const newUsersThisMonth = users.filter(u => {
    const joinDate = new Date(u.joinDate)
    const now = new Date()
    return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear()
  }).length

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-PT')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Ativo</Badge>
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inativo</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Desconhecido</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin':
        return <Badge className="bg-palette-deep/10 text-palette-deep border-palette-deep/20">Admin</Badge>
      case 'Moderator':
        return <Badge className="bg-palette-warm-dark/10 text-palette-warm-dark border-palette-warm-dark/20">Moderador</Badge>
      case 'User':
        return <Badge className="bg-palette-warm-medium/10 text-palette-warm-medium border-palette-warm-medium/20">Utilizador</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Desconhecido</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-palette-warm-dark mb-2">
            Gestão de Utilizadores
          </h1>
          <p className="text-palette-warm-dark/70">
            Gerir contas de utilizadores, permissões e atividade da plataforma
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-palette-warm-medium/20 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-palette-warm-dark">
                Total de Utilizadores
              </CardTitle>
              <Users className="h-4 w-4 text-palette-deep" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-palette-deep">{totalUsers}</div>
              <p className="text-xs text-palette-warm-dark/60">
                Registados na plataforma
              </p>
            </CardContent>
          </Card>

          <Card className="border-palette-warm-medium/20 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-palette-warm-dark">
                Utilizadores Ativos
              </CardTitle>
              <UserPlus className="h-4 w-4 text-palette-deep" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-palette-deep">{activeUsers}</div>
              <p className="text-xs text-palette-warm-dark/60">
                Com sessões ativas
              </p>
            </CardContent>
          </Card>

          <Card className="border-palette-warm-medium/20 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-palette-warm-dark">
                Novos Este Mês
              </CardTitle>
              <Calendar className="h-4 w-4 text-palette-deep" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-palette-deep">{newUsersThisMonth}</div>
              <p className="text-xs text-palette-warm-dark/60">
                Registos em Janeiro
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-palette-warm-dark/40 h-4 w-4" />
            <Input
              placeholder="Pesquisar utilizadores..."
              className="pl-10 border-palette-warm-medium/20 focus:border-palette-deep"
            />
          </div>
          <Button className="bg-palette-deep hover:bg-palette-warm-dark text-white">
            <UserPlus className="mr-2 h-4 w-4" />
            Adicionar Utilizador
          </Button>
        </div>

        {/* Users Table */}
        <Card className="border-palette-warm-medium/20">
          <CardHeader>
            <CardTitle className="text-palette-warm-dark">Lista de Utilizadores</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-palette-warm-medium/20">
                  <TableHead className="text-palette-warm-dark">Nome</TableHead>
                  <TableHead className="text-palette-warm-dark">Email</TableHead>
                  <TableHead className="text-palette-warm-dark">Função</TableHead>
                  <TableHead className="text-palette-warm-dark">Status</TableHead>
                  <TableHead className="text-palette-warm-dark">Data de Registo</TableHead>
                  <TableHead className="text-palette-warm-dark">Última Atividade</TableHead>
                  <TableHead className="text-palette-warm-dark text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="border-palette-warm-medium/20 hover:bg-palette-warm-light/5">
                    <TableCell className="font-medium text-palette-warm-dark">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-palette-warm-dark/80">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      {getRoleBadge(user.role)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status)}
                    </TableCell>
                    <TableCell className="text-palette-warm-dark/80">
                      {formatDate(user.joinDate)}
                    </TableCell>
                    <TableCell className="text-palette-warm-dark/80">
                      {formatDate(user.lastActive)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 text-palette-warm-dark hover:bg-palette-warm-light/10">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="border-palette-warm-medium/20">
                          <DropdownMenuItem className="text-palette-warm-dark hover:bg-palette-warm-light/10">
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
