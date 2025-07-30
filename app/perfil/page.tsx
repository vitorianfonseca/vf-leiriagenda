"use client"

import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"
import { useState, useEffect } from "react"
import { MapPin, Calendar, Bell, Shield, Trash2 } from "lucide-react"
import { useToast } from "@/contexts/toast-context"
import { ImageUpload } from "@/components/image-upload"

function ProfileContent() {
  const { user, updateProfile, updateAvatar } = useAuth()
  const { addToast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "Leiria, Portugal",
    bio: "",
    website: "",
    interests: ["Música", "Arte", "Cultura"],
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      profilePublic: true,
      showEmail: false,
      showPhone: false,
    },
  })

  // Carregar dados do utilizador quando o componente monta
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "Leiria, Portugal",
        bio: user.bio || "",
        website: user.website || "",
      }))
    }
  }, [user])

  const handleSave = () => {
    try {
      // Atualizar o perfil no contexto
      updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        website: formData.website,
      })

      console.log("Saving profile:", formData)
      setIsEditing(false)
      addToast("Perfil atualizado com sucesso!", "success")
    } catch (error) {
      addToast("Erro ao atualizar perfil. Tente novamente.", "error")
    }
  }

  const handleCancel = () => {
    // Restaurar dados originais do utilizador
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "Leiria, Portugal",
        bio: user.bio || "",
        website: user.website || "",
      }))
    }
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent as keyof typeof prev], [field]: value },
    }))
  }

  const stats = [
    { label: "Eventos Submetidos", value: "12", icon: Calendar },
    { label: "Eventos Favoritos", value: user?.favorites?.length || "0", icon: "❤️" },
    { label: "Membro desde", value: "Dez 2023", icon: "📅" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <ImageUpload
                    currentImage={user?.avatar}
                    onImageChange={updateAvatar}
                    size="lg"
                    fallbackText={user?.name?.charAt(0).toUpperCase() || "U"}
                    disabled={!isEditing} // Só permite upload quando está editando
                  />
                  {/* Indicador visual quando não está editando */}
                  {!isEditing && (
                    <div className="absolute inset-0 rounded-full bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-medium">Editar para alterar</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{user?.name}</h1>
                  <p className="text-gray-600 mb-2">{user?.email}</p>
                  <div className="flex items-center justify-center md:justify-start text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{formData.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {formData.interests.map((interest) => (
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
                    variant={isEditing ? "outline" : "default"}
                    className={isEditing ? "bg-transparent" : "bg-primary hover:bg-primary/90 text-white"}
                  >
                    {isEditing ? "Cancelar" : "Editar Perfil"}
                  </Button>
                  {isEditing && (
                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-white">
                      Guardar
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl mb-2">
                    {typeof stat.icon === "string" ? (
                      stat.icon
                    ) : (
                      <stat.icon className="h-8 w-8 mx-auto text-primary" />
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    disabled={!isEditing}
                    placeholder="+351 XXX XXX XXX"
                  />
                </div>

                <div>
                  <Label htmlFor="location">Localização</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    disabled={!isEditing}
                    placeholder="https://www.exemplo.com"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Biografia</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Conte-nos um pouco sobre si..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <div className="space-y-6">
              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2 text-primary" />
                    Notificações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações por Email</Label>
                      <p className="text-sm text-gray-600">Receber emails sobre novos eventos</p>
                    </div>
                    <Switch
                      checked={formData.notifications.email}
                      onCheckedChange={(checked) => handleNestedChange("notifications", "email", checked)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificações Push</Label>
                      <p className="text-sm text-gray-600">Receber notificações no browser</p>
                    </div>
                    <Switch
                      checked={formData.notifications.push}
                      onCheckedChange={(checked) => handleNestedChange("notifications", "push", checked)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS</Label>
                      <p className="text-sm text-gray-600">Receber SMS sobre eventos importantes</p>
                    </div>
                    <Switch
                      checked={formData.notifications.sms}
                      onCheckedChange={(checked) => handleNestedChange("notifications", "sms", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    Privacidade
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Perfil Público</Label>
                      <p className="text-sm text-gray-600">Outros utilizadores podem ver o seu perfil</p>
                    </div>
                    <Switch
                      checked={formData.privacy.profilePublic}
                      onCheckedChange={(checked) => handleNestedChange("privacy", "profilePublic", checked)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mostrar Email</Label>
                      <p className="text-sm text-gray-600">Email visível no perfil público</p>
                    </div>
                    <Switch
                      checked={formData.privacy.showEmail}
                      onCheckedChange={(checked) => handleNestedChange("privacy", "showEmail", checked)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Mostrar Telefone</Label>
                      <p className="text-sm text-gray-600">Telefone visível no perfil público</p>
                    </div>
                    <Switch
                      checked={formData.privacy.showPhone}
                      onCheckedChange={(checked) => handleNestedChange("privacy", "showPhone", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-600">
                    <Trash2 className="h-5 w-5 mr-2" />
                    Zona Perigosa
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Eliminar Conta</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Esta ação é irreversível. Todos os seus dados serão permanentemente eliminados.
                    </p>
                    <Button variant="destructive" size="sm">
                      Eliminar Conta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <AuthGuard message="Faça login para aceder ao seu perfil.">
      <ProfileContent />
    </AuthGuard>
  )
}
