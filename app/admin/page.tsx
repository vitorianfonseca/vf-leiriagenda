"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, Settings, BarChart3, Shield, Server } from "lucide-react"
import { useI18n } from "@/hooks/use-i18n"
import { AdminGuard } from "@/components/admin-guard"

export default function AdminDashboard() {
  const { t } = useI18n()

    const adminModules = [
    {
      title: "Gestão de Utilizadores",
      description: "Gerir contas, permissões e estatísticas de utilizadores",
      icon: Users,
      href: "/admin/users"
    },
    {
      title: "Gestão de Eventos", 
      description: "Aprovar, editar e gerir todos os eventos da plataforma",
      icon: Calendar,
      href: "/admin/events"
    },
    {
      title: "Moderação",
      description: "Rever conteúdo reportado e tomar ações de moderação",
      icon: Shield,
      href: "/admin/moderation"
    },
    {
      title: "Análises",
      description: "Estatísticas detalhadas e relatórios da plataforma", 
      icon: BarChart3,
      href: "/admin/analytics"
    },
    {
      title: "Configurações",
      description: "Definições globais da aplicação e personalização",
      icon: Settings,
      href: "/admin/settings"
    },
    {
      title: "Sistema",
      description: "Logs, backup e manutenção do sistema",
      icon: Server,
      href: "/admin/system"
    }
  ]

  return (
    <AdminGuard>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-2">Painel de Administração</h1>
            <p className="text-white/90">Gerir e monitorizar a plataforma LeiriAgenda</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {adminModules.map((module) => {
              const IconComponent = module.icon
              return (
                <Link key={module.href} href={module.href}>
                  <Card className="h-full border-primary/20 hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group bg-white">
                    <CardHeader className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform border border-primary/10">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg text-primary group-hover:text-accent transition-colors mb-2">
                        {module.title}
                      </CardTitle>
                      <CardDescription className="text-primary/70 text-sm">
                        {module.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>

          {/* Estatísticas Rápidas */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-palette-deep mb-6">Estatísticas Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-palette-warm-medium/20 bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-palette-warm-dark">
                    Utilizadores Ativos
                  </CardTitle>
                  <Users className="h-4 w-4 text-palette-deep" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-palette-deep">1.2K</div>
                  <p className="text-xs text-palette-warm-dark/60">
                    +8% desde o último mês
                  </p>
                </CardContent>
              </Card>

              <Card className="border-palette-warm-medium/20 bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-palette-warm-dark">
                    Eventos Publicados
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-palette-deep" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-palette-deep">24</div>
                  <p className="text-xs text-palette-warm-dark/60">
                    Este mês
                  </p>
                </CardContent>
              </Card>

              <Card className="border-palette-warm-medium/20 bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-palette-warm-dark">
                    Eventos Pendentes
                  </CardTitle>
                  <Shield className="h-4 w-4 text-palette-deep" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-palette-deep">7</div>
                  <p className="text-xs text-palette-warm-dark/60">
                    Requer aprovação
                  </p>
                </CardContent>
              </Card>

              <Card className="border-palette-warm-medium/20 bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-palette-warm-dark">
                    Taxa de Crescimento
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-palette-deep" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-palette-deep">+18%</div>
                  <p className="text-xs text-palette-warm-dark/60">
                    Comparado ao último trimestre
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  )
}
