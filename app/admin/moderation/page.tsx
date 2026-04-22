"use client"

import { AdminGuard } from "@/components/admin-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, AlertTriangle, Eye, Check, X, Calendar, Users, MessageSquare } from "lucide-react"
import { useState } from "react"

export default function AdminModerationPage() {
  const [reports] = useState([
    {
      id: "1",
      type: "event",
      title: "Evento inapropriado",
      reporter: "Maria Silva",
      reportedItem: "Workshop de Fotografia",
      reason: "Conteúdo inadequado",
      status: "pending",
      date: "2024-01-15",
      priority: "high"
    },
    {
      id: "2", 
      type: "user",
      title: "Utilizador suspeito",
      reporter: "João Santos",
      reportedItem: "user@example.com",
      reason: "Comportamento abusivo",
      status: "pending",
      date: "2024-01-14",
      priority: "medium"
    },
    {
      id: "3",
      type: "comment",
      title: "Comentário ofensivo",
      reporter: "Ana Costa",
      reportedItem: "Comentário no evento X",
      reason: "Linguagem imprópria",
      status: "resolved",
      date: "2024-01-13",
      priority: "low"
    }
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendente</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Resolvido</Badge>
      case "dismissed":
        return <Badge className="bg-muted/40 text-foreground border-border">Rejeitado</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Alta</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Média</Badge>
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Baixa</Badge>
      default:
        return <Badge variant="secondary">-</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "event":
        return <Calendar className="h-4 w-4" />
      case "user":
        return <Users className="h-4 w-4" />
      case "comment":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <AdminGuard>
      <div className="flex-1 bg-background">
        {/* Header */}
        <div className="bg-card border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Moderação</h1>
            <p className="text-primary/60">Gerir relatórios e conteúdo da plataforma</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Relatórios Pendentes</CardTitle>
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {reports.filter(r => r.status === "pending").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Relatórios</CardTitle>
                <Shield className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{reports.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolvidos</CardTitle>
                <Check className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {reports.filter(r => r.status === "resolved").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alta Prioridade</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {reports.filter(r => r.priority === "high").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Relatórios de Moderação
              </CardTitle>
              <CardDescription>
                Todos os relatórios submetidos pela comunidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Reportado Por</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(report.type)}
                          <span className="capitalize">{report.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {report.reporter.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span>{report.reporter}</span>
                        </div>
                      </TableCell>
                      <TableCell>{report.reportedItem}</TableCell>
                      <TableCell>{report.reason}</TableCell>
                      <TableCell>{getPriorityBadge(report.priority)}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>{new Date(report.date).toLocaleDateString('pt-PT')}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Ver
                          </Button>
                          {report.status === "pending" && (
                            <>
                              <Button variant="outline" size="sm" className="text-green-600">
                                <Check className="h-4 w-4 mr-1" />
                                Aprovar
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                <X className="h-4 w-4 mr-1" />
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
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminGuard>
  )
}
