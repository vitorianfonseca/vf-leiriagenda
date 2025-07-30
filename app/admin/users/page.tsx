"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus, Users, Calendar, Search, MoreHorizontal, Edit, Trash2, RefreshCw } from "lucide-react"
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
import { useState, useEffect } from "react"
import DataService, { User } from "@/lib/data-service"
import { useToast } from "@/hooks/use-toast"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  // Carregar utilizadores ao inicializar
  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => {
    const loadedUsers = DataService.getUsers()
    setUsers(loadedUsers)
  }

  const handleDeleteUser = async (userId: string) => {
    if (confirm("Tem a certeza que deseja eliminar este utilizador?")) {
      const success = DataService.deleteUser(userId)
      if (success) {
        loadUsers() // Recarregar lista
        toast({
          title: "Utilizador eliminado",
          description: "O utilizador foi eliminado com sucesso.",
        })
      } else {
        toast({
          title: "Erro",
          description: "Não foi possível eliminar o utilizador.",
          variant: "destructive"
        })
      }
    }
  }

  const handleChangeAvatar = (userId: string) => {
    const newAvatar = DataService.generateNewRandomAvatar()
    const updated = DataService.updateUser(userId, { avatar: newAvatar })
    if (updated) {
      loadUsers()
      toast({
        title: "Avatar atualizado",
        description: "O avatar foi alterado com sucesso.",
      })
    }
  }

  const handleToggleStatus = (userId: string) => {
    const user = users.find(u => u.id === userId)
    if (user) {
      const newStatus = user.status === 'active' ? 'inactive' : 'active'
      const updated = DataService.updateUser(userId, { status: newStatus })
      if (updated) {
        loadUsers()
        toast({
          title: "Status atualizado",
          description: `Utilizador está agora ${newStatus === 'active' ? 'ativo' : 'inativo'}.`,
        })
      }
    }
  }

  // Filtrar utilizadores por termo de pesquisa
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            <CardTitle className="text-palette-warm-dark">
              Lista de Utilizadores ({filteredUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-palette-warm-medium/20">
                  <TableHead className="text-palette-warm-dark">Avatar</TableHead>
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
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-palette-warm-medium/20 hover:bg-palette-warm-light/5">
                    <TableCell>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-palette-deep text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
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
                      <button onClick={() => handleToggleStatus(user.id)}>
                        {getStatusBadge(user.status)}
                      </button>
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
                          <DropdownMenuItem 
                            className="text-palette-warm-dark hover:bg-palette-warm-light/10"
                            onClick={() => handleChangeAvatar(user.id)}
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Mudar Avatar
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-palette-warm-dark hover:bg-palette-warm-light/10"
                            onClick={() => handleToggleStatus(user.id)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            {user.status === 'active' ? 'Desativar' : 'Ativar'}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteUser(user.id)}
                          >
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
