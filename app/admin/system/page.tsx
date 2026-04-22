"use client"

import { AdminGuard } from "@/components/admin-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Server, Database, Download, Upload, Activity, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { useState } from "react"

export default function AdminSystemPage() {
  const [logs] = useState([
    {
      id: "1",
      level: "info",
      message: "Utilizador fez login com sucesso",
      timestamp: "2024-01-15 14:30:25",
      category: "auth"
    },
    {
      id: "2",
      level: "warning", 
      message: "Tentativa de acesso a página não autorizada",
      timestamp: "2024-01-15 14:28:12",
      category: "security"
    },
    {
      id: "3",
      level: "error",
      message: "Falha na conexão com a base de dados",
      timestamp: "2024-01-15 14:25:08",
      category: "database"
    },
    {
      id: "4",
      level: "info",
      message: "Novo evento criado com sucesso",
      timestamp: "2024-01-15 14:20:15",
      category: "events"
    }
  ])

  const getLogLevelBadge = (level: string) => {
    switch (level) {
      case "info":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Info</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Error</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getLogIcon = (level: string) => {
    switch (level) {
      case "info":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-primary/60" />
    }
  }

  const systemStats = {
    uptime: "15 dias, 4 horas",
    version: "1.0.0",
    database: "Online",
    storage: "85% usado",
    memoryUsage: "2.1 GB / 4 GB",
    activeUsers: 127,
    lastBackup: "2024-01-15 02:00:00"
  }

  return (
    <AdminGuard>
      <div className="flex-1 bg-background">
        {/* Header */}
        <div className="bg-card border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Sistema</h1>
            <p className="text-primary/60">Monitorização, logs e manutenção do sistema</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex items-center gap-2">
                <Server className="h-4 w-4" />
                Logs
              </TabsTrigger>
              <TabsTrigger value="backup" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Backup
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="flex items-center gap-2">
                <Server className="h-4 w-4" />
                Manutenção
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* System Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Status do Sistema</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">Online</div>
                    <p className="text-xs text-primary/60">Uptime: {systemStats.uptime}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Base de Dados</CardTitle>
                    <Database className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">{systemStats.database}</div>
                    <p className="text-xs text-primary/60">Armazenamento: {systemStats.storage}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Utilizadores Ativos</CardTitle>
                    <Activity className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{systemStats.activeUsers}</div>
                    <p className="text-xs text-primary/60">Nos últimos 30 minutos</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Memória</CardTitle>
                    <Server className="h-4 w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">52%</div>
                    <p className="text-xs text-primary/60">{systemStats.memoryUsage}</p>
                  </CardContent>
                </Card>
              </div>

              {/* System Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Sistema</CardTitle>
                  <CardDescription>Detalhes técnicos da aplicação</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <strong>Versão:</strong> {systemStats.version}
                    </div>
                    <div>
                      <strong>Último Backup:</strong> {systemStats.lastBackup}
                    </div>
                    <div>
                      <strong>Node.js:</strong> v18.17.0
                    </div>
                    <div>
                      <strong>Next.js:</strong> v13.4.0
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logs" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Logs do Sistema
                  </CardTitle>
                  <CardDescription>
                    Registos de atividade e eventos do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nível</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Mensagem</TableHead>
                        <TableHead>Timestamp</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getLogIcon(log.level)}
                              {getLogLevelBadge(log.level)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{log.category}</Badge>
                          </TableCell>
                          <TableCell>{log.message}</TableCell>
                          <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="backup" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Gestão de Backup
                  </CardTitle>
                  <CardDescription>
                    Criar, restaurar e gerir backups do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Button className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Criar Backup
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Restaurar Backup
                    </Button>
                  </div>
                  
                  <div className="border rounded p-4 bg-background">
                    <h4 className="font-medium mb-2">Último Backup</h4>
                    <p className="text-sm text-primary/60">
                      <strong>Data:</strong> {systemStats.lastBackup}<br />
                      <strong>Tamanho:</strong> 245 MB<br />
                      <strong>Tipo:</strong> Backup Automático
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Manutenção do Sistema</CardTitle>
                  <CardDescription>
                    Ferramentas para manutenção e otimização
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Limpeza de Cache</h4>
                    <p className="text-sm text-primary/60">
                      Limpar ficheiros temporários e cache do sistema
                    </p>
                    <Button variant="outline">Executar Limpeza</Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Otimização da Base de Dados</h4>
                    <p className="text-sm text-primary/60">
                      Otimizar tabelas e índices da base de dados
                    </p>
                    <Button variant="outline">Otimizar DB</Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Reiniciar Serviços</h4>
                    <p className="text-sm text-primary/60">
                      Reiniciar serviços do sistema (usar com cuidado)
                    </p>
                    <Button variant="destructive">Reiniciar Sistema</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminGuard>
  )
}
