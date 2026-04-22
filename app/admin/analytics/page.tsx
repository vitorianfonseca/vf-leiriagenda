"use client"

import { AdminGuard } from "@/components/admin-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Users, Calendar, Download, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminAnalyticsPage() {
  return (
    <AdminGuard>
      <div className="flex-1 bg-background">
        {/* Header */}
        <div className="bg-card border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
            <p className="text-primary/60">Métricas, relatórios e análise de desempenho da plataforma</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">

        {/* Filtros de período */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Período de Análise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <Select defaultValue="last30">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7">Últimos 7 dias</SelectItem>
                  <SelectItem value="last30">Últimos 30 dias</SelectItem>
                  <SelectItem value="last90">Últimos 90 dias</SelectItem>
                  <SelectItem value="lastyear">Último ano</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar Relatório
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="users">Utilizadores</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Métricas principais */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="border-palette-warm-medium/20 bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-palette-warm-dark">Visualizações</p>
                      <p className="text-2xl font-bold text-primary">15,234</p>
                      <p className="text-xs text-primary/50">+12% vs mês anterior</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-palette-warm-medium/20 bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-palette-warm-dark">Novos Utilizadores</p>
                      <p className="text-2xl font-bold text-primary">342</p>
                      <p className="text-xs text-primary/50">+8% vs mês anterior</p>
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-palette-warm-medium/20 bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-palette-warm-dark">Eventos Criados</p>
                      <p className="text-2xl font-bold text-primary">89</p>
                      <p className="text-xs text-primary/50">+15% vs mês anterior</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-palette-warm-medium/20 bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-palette-warm-dark">Taxa de Conversão</p>
                      <p className="text-2xl font-bold text-primary">4.2%</p>
                      <p className="text-xs text-primary/50">-2% vs mês anterior</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráficos principais */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-palette-warm-medium/20 bg-card">
                <CardHeader>
                  <CardTitle className="text-palette-deep">Visitantes por Dia</CardTitle>
                  <CardDescription className="text-palette-warm-dark">
                    Últimos 30 dias
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-card rounded-lg">
                    <p className="text-primary/50">Gráfico de linha - Visitantes por dia</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-palette-warm-medium/20 bg-card">
                <CardHeader>
                  <CardTitle className="text-palette-deep">Eventos por Categoria</CardTitle>
                  <CardDescription className="text-palette-warm-dark">
                    Distribuição atual
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-card rounded-lg">
                    <p className="text-primary/50">Gráfico circular - Eventos por categoria</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-palette-warm-medium/20 bg-card">
                <CardHeader>
                  <CardTitle className="text-palette-deep">Eventos Mais Populares</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-palette-warm-dark">Festival de Música</span>
                      <span className="text-sm font-semibold">234 participantes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-palette-warm-dark">Workshop de Cerâmica</span>
                      <span className="text-sm font-semibold">156 participantes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-palette-warm-dark">Mercado de Natal</span>
                      <span className="text-sm font-semibold">98 participantes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-palette-warm-medium/20 bg-card">
                <CardHeader>
                  <CardTitle className="text-palette-deep">Performance por Categoria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center bg-card rounded-lg">
                    <p className="text-primary/50">Gráfico de barras</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-palette-warm-medium/20 bg-card">
                <CardHeader>
                  <CardTitle className="text-palette-deep">Taxa de Aprovação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">92.1%</div>
                    <p className="text-sm text-palette-warm-dark">Eventos aprovados automaticamente</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-palette-warm-medium/20 bg-card">
                <CardHeader>
                  <CardTitle className="text-palette-deep">Crescimento de Utilizadores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-card rounded-lg">
                    <p className="text-primary/50">Gráfico de área - Crescimento mensal</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-palette-warm-medium/20 bg-card">
                <CardHeader>
                  <CardTitle className="text-palette-deep">Demografia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>18-25 anos</span>
                        <span>32%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-palette-warm-beige h-2 rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>26-35 anos</span>
                        <span>28%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-palette-rose-warm h-2 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>36-50 anos</span>
                        <span>25%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-palette-warm-dark h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>50+ anos</span>
                        <span>15%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-palette-warm-dark h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-palette-warm-medium/20 bg-card">
                <CardHeader>
                  <CardTitle className="text-palette-deep">Tempo Médio na Página</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">2m 34s</div>
                    <p className="text-sm text-palette-warm-dark">+12% vs mês anterior</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-palette-warm-medium/20 bg-card">
                <CardHeader>
                  <CardTitle className="text-palette-deep">Taxa de Rejeição</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">23.4%</div>
                    <p className="text-sm text-palette-warm-dark">-5% vs mês anterior</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-palette-warm-medium/20 bg-card">
                <CardHeader>
                  <CardTitle className="text-palette-deep">Páginas por Sessão</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">3.2</div>
                    <p className="text-sm text-palette-warm-dark">+8% vs mês anterior</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </AdminGuard>
  )
}
