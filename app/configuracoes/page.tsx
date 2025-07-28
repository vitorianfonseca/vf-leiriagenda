"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect } from "react"
import { Settings, Bell, Shield, Palette, Download, Trash2, Moon, Sun, Monitor } from "lucide-react"
import { useToast } from "@/contexts/toast-context"
import { useI18n } from "@/hooks/use-i18n"
import { useTheme } from "@/hooks/use-theme"

function SettingsContent() {
  const { addToast } = useToast()
  const { t, locale, setLocale } = useI18n()
  const { theme, setTheme } = useTheme()

  const [settings, setSettings] = useState({
    notifications: {
      newEvents: true,
      eventReminders: true,
      weeklyDigest: false,
      marketing: false,
    },
    privacy: {
      profileVisibility: "public",
      activityStatus: true,
      dataCollection: true,
    },
    preferences: {
      defaultView: "grid",
      eventsPerPage: "12",
      autoLocation: true,
    },
  })

  // Carregar configurações guardadas
  useEffect(() => {
    const savedSettings = localStorage.getItem("leiria-agenda-settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings((prev) => {
      const newSettings = {
        ...prev,
        [category]: {
          ...prev[category as keyof typeof prev],
          [setting]: value,
        },
      }

      // Guardar imediatamente no localStorage
      localStorage.setItem("leiria-agenda-settings", JSON.stringify(newSettings))
      return newSettings
    })

    // Mostrar feedback visual
    addToast(t("settings.settingsUpdated"), "success", 1500)
  }

  const handleSave = () => {
    localStorage.setItem("leiria-agenda-settings", JSON.stringify(settings))
    console.log("Saving settings:", settings)
    addToast(t("settings.allSettingsSaved"), "success")
  }

  const handleExportData = () => {
    alert("A preparar exportação dos seus dados...")
  }

  const handleDeleteAccount = () => {
    if (confirm("Tem a certeza que quer eliminar a sua conta? Esta ação é irreversível.")) {
      alert("Conta eliminada com sucesso.")
    }
  }

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale as "pt" | "en")
    addToast(t("settings.settingsUpdated"), "success", 1500)
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as "light" | "dark" | "system")
    addToast(t("settings.settingsUpdated"), "success", 1500)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("settings.title")}</h1>
            <p className="text-gray-600 dark:text-gray-400">{t("settings.subtitle")}</p>
          </div>

          <div className="space-y-6">
            {/* Appearance */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Palette className="h-5 w-5 mr-2 text-[#D4AF37]" />
                  {t("settings.appearance")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-base font-medium dark:text-white">{t("settings.theme")}</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t("settings.themeDesc")}</p>
                  <Select value={theme} onValueChange={handleThemeChange}>
                    <SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center">
                          <Sun className="h-4 w-4 mr-2" />
                          {t("settings.light")}
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center">
                          <Moon className="h-4 w-4 mr-2" />
                          {t("settings.dark")}
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center">
                          <Monitor className="h-4 w-4 mr-2" />
                          {t("settings.system")}
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="dark:bg-gray-700" />

                <div>
                  <Label className="text-base font-medium dark:text-white">{t("settings.language")}</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t("settings.languageDesc")}</p>
                  <Select value={locale} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt">🇵🇹 {t("settings.portuguese")}</SelectItem>
                      <SelectItem value="en">🇬🇧 {t("settings.english")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Bell className="h-5 w-5 mr-2 text-[#D4AF37]" />
                  {t("profile.notifications")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-white">{t("profile.emailNotifications")}</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t("profile.emailNotificationsDesc")}</p>
                  </div>
                  <Switch
                    checked={settings.notifications.newEvents}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "newEvents", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-white">{t("profile.pushNotifications")}</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t("profile.pushNotificationsDesc")}</p>
                  </div>
                  <Switch
                    checked={settings.notifications.eventReminders}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "eventReminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-white">Resumo Semanal</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receber resumo dos eventos da semana</p>
                  </div>
                  <Switch
                    checked={settings.notifications.weeklyDigest}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "weeklyDigest", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-white">Marketing</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Receber ofertas e novidades</p>
                  </div>
                  <Switch
                    checked={settings.notifications.marketing}
                    onCheckedChange={(checked) => handleSettingChange("notifications", "marketing", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Shield className="h-5 w-5 mr-2 text-[#D4AF37]" />
                  {t("profile.privacy")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-base font-medium dark:text-white">Visibilidade do Perfil</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Controle quem pode ver o seu perfil</p>
                  <Select
                    value={settings.privacy.profileVisibility}
                    onValueChange={(value) => handleSettingChange("privacy", "profileVisibility", value)}
                  >
                    <SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Público</SelectItem>
                      <SelectItem value="friends">Apenas Amigos</SelectItem>
                      <SelectItem value="private">Privado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-white">Estado de Atividade</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Mostrar quando esteve online pela última vez
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.activityStatus}
                    onCheckedChange={(checked) => handleSettingChange("privacy", "activityStatus", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-white">Recolha de Dados</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Permitir recolha de dados para melhorar o serviço
                    </p>
                  </div>
                  <Switch
                    checked={settings.privacy.dataCollection}
                    onCheckedChange={(checked) => handleSettingChange("privacy", "dataCollection", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Settings className="h-5 w-5 mr-2 text-[#D4AF37]" />
                  Preferências
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-base font-medium dark:text-white">Vista Padrão</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Como prefere ver a lista de eventos</p>
                  <Select
                    value={settings.preferences.defaultView}
                    onValueChange={(value) => handleSettingChange("preferences", "defaultView", value)}
                  >
                    <SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grelha</SelectItem>
                      <SelectItem value="list">Lista</SelectItem>
                      <SelectItem value="map">Mapa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium dark:text-white">Eventos por Página</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Quantos eventos mostrar de cada vez</p>
                  <Select
                    value={settings.preferences.eventsPerPage}
                    onValueChange={(value) => handleSettingChange("preferences", "eventsPerPage", value)}
                  >
                    <SelectTrigger className="w-full dark:bg-gray-700 dark:border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 eventos</SelectItem>
                      <SelectItem value="12">12 eventos</SelectItem>
                      <SelectItem value="24">24 eventos</SelectItem>
                      <SelectItem value="48">48 eventos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="dark:text-white">Localização Automática</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Detectar automaticamente a sua localização
                    </p>
                  </div>
                  <Switch
                    checked={settings.preferences.autoLocation}
                    onCheckedChange={(checked) => handleSettingChange("preferences", "autoLocation", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center dark:text-white">
                  <Download className="h-5 w-5 mr-2 text-[#D4AF37]" />
                  Gestão de Dados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Exportar Dados</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Descarregue uma cópia de todos os seus dados pessoais
                  </p>
                  <Button
                    onClick={handleExportData}
                    variant="outline"
                    className="dark:border-gray-600 dark:text-white bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Dados
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-red-200 dark:border-red-800 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-red-600 dark:text-red-400">
                  <Trash2 className="h-5 w-5 mr-2" />
                  Zona Perigosa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Eliminar Conta</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Esta ação eliminará permanentemente a sua conta e todos os dados associados. Esta ação não pode ser
                    desfeita.
                  </p>
                  <Button onClick={handleDeleteAccount} variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar Conta
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end pt-6">
              <Button onClick={handleSave} className="bg-[#D4AF37] hover:bg-[#B8941F] text-white px-8">
                {t("settings.saveSettings")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const { t } = useI18n()

  return (
    <AuthGuard message={t("auth.loginMessage")}>
      <SettingsContent />
    </AuthGuard>
  )
}
