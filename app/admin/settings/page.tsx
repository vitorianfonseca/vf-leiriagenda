"use client"

import { AdminGuard } from "@/components/admin-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Save, Globe, Mail, Shield, Database, Palette, Users } from "lucide-react"

export default function AdminSettingsPage() {
  return (
    <AdminGuard>
      <div className="flex-1 bg-background">
        {/* Header */}
        <div className="bg-card border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-palette-deep mb-2">Configurações</h1>
            <p className="text-palette-warm-dark">Configurar preferências e definições do sistema</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Geral
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Segurança
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Aparência
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Avançado
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="border-palette-warm-medium/20 bg-card">
              <CardHeader>
                <CardTitle className="text-palette-deep flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Configurações Gerais
                </CardTitle>
                <CardDescription>
                  Configurações básicas da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Nome do Site</Label>
                    <Input id="site-name" defaultValue="LeiriAgenda" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-url">URL do Site</Label>
                    <Input id="site-url" defaultValue="https://leiriagenda.pt" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-description">Descrição do Site</Label>
                  <Textarea 
                    id="site-description" 
                    defaultValue="A sua agenda de eventos em Leiria" 
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Registos Públicos</Label>
                      <p className="text-sm text-palette-warm-dark">Permitir que utilizadores se registem publicamente</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Submissão de Eventos</Label>
                      <p className="text-sm text-palette-warm-dark">Permitir submissão de eventos por utilizadores</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Moderação Automática</Label>
                      <p className="text-sm text-palette-warm-dark">Aprovar eventos automaticamente</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <Card className="border-palette-warm-medium/20 bg-card">
              <CardHeader>
                <CardTitle className="text-palette-deep flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Configurações de Email
                </CardTitle>
                <CardDescription>
                  Configurar SMTP e templates de email
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-host">Servidor SMTP</Label>
                    <Input id="smtp-host" placeholder="smtp.gmail.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">Porta SMTP</Label>
                    <Input id="smtp-port" placeholder="587" type="number" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-user">Utilizador SMTP</Label>
                    <Input id="smtp-user" placeholder="noreply@leiriagenda.pt" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-pass">Password SMTP</Label>
                    <Input id="smtp-pass" type="password" placeholder="••••••••" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Emails de Boas-vindas</Label>
                      <p className="text-sm text-palette-warm-dark">Enviar email de boas-vindas aos novos utilizadores</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificações de Eventos</Label>
                      <p className="text-sm text-palette-warm-dark">Enviar notificações sobre novos eventos</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-palette-warm-medium/20 bg-card">
              <CardHeader>
                <CardTitle className="text-palette-deep flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Configurações de Segurança
                </CardTitle>
                <CardDescription>
                  Configurar políticas de segurança e acesso
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Timeout de Sessão (minutos)</Label>
                  <Input id="session-timeout" defaultValue="120" type="number" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-login-attempts">Máximo de Tentativas de Login</Label>
                  <Input id="max-login-attempts" defaultValue="5" type="number" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-palette-warm-dark">Exigir 2FA para administradores</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Logs de Segurança</Label>
                      <p className="text-sm text-palette-warm-dark">Registar tentativas de acesso</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Proteção CSRF</Label>
                      <p className="text-sm text-palette-warm-dark">Ativar proteção contra ataques CSRF</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Aplicar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <Card className="border-palette-warm-medium/20 bg-card">
              <CardHeader>
                <CardTitle className="text-palette-deep flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Aparência e Tema
                </CardTitle>
                <CardDescription>
                  Personalizar a aparência da plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Cor Principal</Label>
                  <div className="flex gap-2">
                                        <Input id="primary-color" defaultValue="#6F5E53" />
                    <div className="w-12 h-10 bg-primary rounded border"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="theme-mode">Modo de Tema</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Modo Escuro Automático</Label>
                      <p className="text-sm text-palette-warm-dark">Alternar automaticamente baseado no horário</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Animações Reduzidas</Label>
                      <p className="text-sm text-palette-warm-dark">Reduzir animações para melhor performance</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Button className="bg-primary hover:bg-primary/90 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Aplicar Tema
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card className="border-palette-warm-medium/20 bg-card">
              <CardHeader>
                <CardTitle className="text-palette-deep flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Configurações Avançadas
                </CardTitle>
                <CardDescription>
                  Configurações técnicas e de sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cache-duration">Duração do Cache (horas)</Label>
                    <Input id="cache-duration" defaultValue="24" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-upload-size">Tamanho Max. Upload (MB)</Label>
                    <Input id="max-upload-size" defaultValue="10" type="number" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allowed-domains">Domínios Permitidos</Label>
                  <Textarea 
                    id="allowed-domains" 
                    placeholder="leiriagenda.pt&#10;*.leiria.gov.pt"
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mode de Debug</Label>
                      <p className="text-sm text-palette-warm-dark">Ativar logs detalhados (apenas desenvolvimento)</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Backup Automático</Label>
                      <p className="text-sm text-palette-warm-dark">Criar backups automáticos da base de dados</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Compressão de Imagens</Label>
                      <p className="text-sm text-palette-warm-dark">Comprimir automaticamente imagens enviadas</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Configurações
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                    Limpar Cache
                  </Button>
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
