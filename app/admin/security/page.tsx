"use client"

import { AdminGuard } from "@/components/admin-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Key, Users, AlertTriangle, Lock, Eye, Download, Trash2 } from "lucide-react"

export default function AdminSecurityPage() {
  const securityLogs = [
    {
      id: 1,
      type: "login_success",
      user: "admin@leiriagenda.pt",
      ip: "192.168.1.100",
      timestamp: "2024-07-29 14:30:25",
      location: "Leiria, Portugal"
    },
    {
      id: 2,
      type: "login_failed",
      user: "unknown@example.com",
      ip: "45.123.45.67",
      timestamp: "2024-07-29 13:45:12",
      location: "Unknown"
    },
    {
      id: 3,
      type: "password_change",
      user: "user@example.com",
      ip: "192.168.1.50",
      timestamp: "2024-07-29 12:15:30",
      location: "Leiria, Portugal"
    }
  ]

  const activeTokens = [
    {
      id: 1,
      name: "API Token - Mobile App",
      created: "2024-07-15",
      lastUsed: "2024-07-29",
      permissions: ["read:events", "write:events"]
    },
    {
      id: 2,
      name: "Integration Token - Newsletter",
      created: "2024-07-01",
      lastUsed: "2024-07-28",
      permissions: ["read:users", "read:events"]
    }
  ]

  const getLogTypeBadge = (type: string) => {
    switch (type) {
      case "login_success":
        return <Badge className="bg-palette-cream-light text-palette-light-grey border-palette-warm-beige">Login Sucesso</Badge>
      case "login_failed":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Login Falhado</Badge>
      case "password_change":
        return <Badge className="bg-palette-cream-light text-palette-light-grey border-palette-warm-beige">Alteração Password</Badge>
      default:
        return <Badge variant="outline">Desconhecido</Badge>
    }
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-palette-deep mb-2">Segurança</h1>
            <p className="text-palette-warm-dark">Monitorizar e gerir a segurança da plataforma</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">

        {/* Alertas de segurança */}
        <Alert className="mb-6 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-palette-warm-dark" />
          <AlertDescription className="text-orange-800">
            Foram detetadas 3 tentativas de login falhadas nas últimas 24 horas.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="authentication">Autenticação</TabsTrigger>
            <TabsTrigger value="tokens">Tokens API</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Métricas de segurança */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-palette-warm-medium/20 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-palette-warm-dark">Tentativas Falhadas</p>
                      <p className="text-2xl font-bold text-red-600">3</p>
                      <p className="text-xs text-gray-500">Últimas 24h</p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-palette-warm-medium/20 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-palette-warm-dark">Logins Bem-sucedidos</p>
                      <p className="text-2xl font-bold text-green-600">47</p>
                      <p className="text-xs text-gray-500">Últimas 24h</p>
                    </div>
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-palette-warm-medium/20 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-palette-warm-dark">Sessões Ativas</p>
                      <p className="text-2xl font-bold text-palette-warm-beige">12</p>
                      <p className="text-xs text-gray-500">Agora</p>
                    </div>
                    <Users className="h-8 w-8 text-palette-warm-beige" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-palette-warm-medium/20 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-palette-warm-dark">Tokens API</p>
                      <p className="text-2xl font-bold text-purple-600">5</p>
                      <p className="text-xs text-gray-500">Ativos</p>
                    </div>
                    <Key className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Configurações rápidas */}
            <Card className="border-palette-warm-medium/20 bg-white">
              <CardHeader>
                <CardTitle className="text-palette-deep">Configurações Rápidas de Segurança</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-palette-warm-dark">Exigir 2FA para todos os administradores</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Bloqueio Automático</Label>
                    <p className="text-sm text-palette-warm-dark">Bloquear contas após tentativas falhadas</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações de Login</Label>
                    <p className="text-sm text-palette-warm-dark">Enviar email para logins suspeitos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="authentication" className="space-y-6">
            <Card className="border-palette-warm-medium/20 bg-white">
              <CardHeader>
                <CardTitle className="text-palette-deep flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Políticas de Autenticação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="min-password-length">Comprimento Mínimo da Password</Label>
                    <Input id="min-password-length" defaultValue="8" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-login-attempts">Máximo de Tentativas de Login</Label>
                    <Input id="max-login-attempts" defaultValue="5" type="number" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Timeout de Sessão (minutos)</Label>
                    <Input id="session-timeout" defaultValue="120" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lockout-duration">Duração do Bloqueio (minutos)</Label>
                    <Input id="lockout-duration" defaultValue="30" type="number" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Exigir Caracteres Especiais</Label>
                      <p className="text-sm text-palette-warm-dark">Password deve conter símbolos</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Exigir Números</Label>
                      <p className="text-sm text-palette-warm-dark">Password deve conter números</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Exigir Maiúsculas e Minúsculas</Label>
                      <p className="text-sm text-palette-warm-dark">Password deve conter ambos os casos</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Aplicar Políticas
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tokens" className="space-y-6">
            <Card className="border-palette-warm-medium/20 bg-white">
              <CardHeader>
                <CardTitle className="text-palette-deep flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Tokens API Ativos
                </CardTitle>
                <CardDescription>
                  Gerir tokens de acesso à API
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-palette-warm-dark">{activeTokens.length} tokens ativos</p>
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Criar Novo Token
                  </Button>
                </div>

                <div className="space-y-4">
                  {activeTokens.map((token) => (
                    <div key={token.id} className="border border-palette-warm-medium/20 bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-palette-deep">{token.name}</h4>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-palette-warm-dark">
                        <div>
                          <span className="font-medium">Criado:</span> {token.created}
                        </div>
                        <div>
                          <span className="font-medium">Último uso:</span> {token.lastUsed}
                        </div>
                        <div>
                          <span className="font-medium">Permissões:</span> {token.permissions.length}
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1">
                          {token.permissions.map((permission, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card className="border-palette-warm-medium/20 bg-white">
              <CardHeader>
                <CardTitle className="text-palette-deep flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Logs de Segurança
                </CardTitle>
                <CardDescription>
                  Atividade recente de segurança
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-palette-warm-dark">Últimas 50 entradas</p>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Logs
                  </Button>
                </div>

                <div className="space-y-3">
                  {securityLogs.map((log) => (
                    <div key={log.id} className="border border-palette-warm-medium/20 bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {getLogTypeBadge(log.type)}
                          <span className="font-medium text-palette-deep">{log.user}</span>
                        </div>
                        <span className="text-sm text-gray-500">{log.timestamp}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-palette-warm-dark">
                        <div>
                          <span className="font-medium">IP:</span> {log.ip}
                        </div>
                        <div>
                          <span className="font-medium">Localização:</span> {log.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-center">
                  <Button variant="outline">Carregar Mais</Button>
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
