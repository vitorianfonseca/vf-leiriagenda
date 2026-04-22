"use client"

import { useState, useEffect } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Calendar, 
  Heart, 
  Eye,
  Edit,
  Save,
  X,
  Camera,
  Settings,
  Shield,
  Activity,
  BookOpen,
  Star
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/contexts/toast-context"
import DataService, { type Event } from "@/lib/data-service"
import { FileUploadZone } from "@/components/file-upload-zone"

interface ProfileFormData {
  name: string
  email: string
  phone: string
  location: string
  bio: string
  website: string
}

export default function PerfilPage() {
  const { user, updateProfile, updateAvatar } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    website: ""
  })
  const [favoriteEvents, setFavoriteEvents] = useState<Event[]>([])
  const [submittedEvents, setSubmittedEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addToast } = useToast()

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
        website: user.website || ""
      })
      loadUserData()
    }
  }, [user])

  const loadUserData = async () => {
    try {
      const allEvents = DataService.getEvents()
      
      // Load favorite events
      if (user?.favorites) {
        const favorites = allEvents.filter(event => 
          user.favorites.includes(event.id) && event.status === "approved"
        )
        setFavoriteEvents(favorites)
      }
      
      // Load submitted events
      const submitted = allEvents.filter(event => 
        event.organizer === user?.name || event.email === user?.email
      )
      setSubmittedEvents(submitted)
      
      setIsLoading(false)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      addToast("Erro ao carregar dados do perfil", "error")
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    try {
      if (!user) return
      
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        bio: formData.bio,
        website: formData.website
      })
      
      setIsEditing(false)
      addToast("Perfil atualizado com sucesso!", "success")
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error)
      addToast("Erro ao atualizar perfil", "error")
    }
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
        website: user.website || ""
      })
    }
    setIsEditing(false)
  }

  const handleAvatarChange = async (file: File, previewUrl: string) => {
    try {
      await updateAvatar(previewUrl)
      addToast("Avatar atualizado com sucesso!", "success")
    } catch (error) {
      console.error("Erro ao atualizar avatar:", error)
      addToast("Erro ao atualizar avatar", "error")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Aprovado</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendente</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejeitado</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Administrador</Badge>
      case "moderator":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Moderador</Badge>
      case "user":
        return <Badge className="bg-muted/40 text-foreground/90 border-border">Utilizador</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <User className="h-12 w-12 text-primary/40 mx-auto mb-4 animate-spin" />
            <p className="text-primary/50">A carregar perfil...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <User className="h-16 w-16 text-primary/40 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Perfil não encontrado</h3>
            <p className="text-primary/50">Faça login para aceder ao seu perfil</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AuthGuard>
      <div className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Meu Perfil</h1>
                <p className="text-primary/60">
                  Gerencie as suas informações pessoais e atividades
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {getRoleBadge(user.role)}
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "A Editar" : "Editar Perfil"}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="text-center">
                  <div className="relative mx-auto mb-4">
                    <Avatar className="w-24 h-24 mx-auto">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-2xl">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <div className="absolute bottom-0 right-0">
                        <FileUploadZone
                          onFileSelect={handleAvatarChange}
                          acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
                          maxSize={2}
                          className="w-8 h-8"
                        >
                          <Button size="sm" className="rounded-full w-8 h-8 p-0">
                            <Camera className="h-4 w-4" />
                          </Button>
                        </FileUploadZone>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl">{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-primary/40" />
                    <span className="text-sm text-primary/60">
                      Membro desde {new Date(user.joinDate).toLocaleDateString('pt-PT')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Activity className="h-4 w-4 text-primary/40" />
                    <span className="text-sm text-primary/60">
                      Última atividade: {new Date(user.lastLogin).toLocaleDateString('pt-PT')}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="h-4 w-4 text-primary/40" />
                    <span className="text-sm text-primary/60">
                      {favoriteEvents.length} evento(s) favorito(s)
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-4 w-4 text-primary/40" />
                    <span className="text-sm text-primary/60">
                      {submittedEvents.length} evento(s) submetido(s)
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="profile">Perfil</TabsTrigger>
                  <TabsTrigger value="favorites">Favoritos</TabsTrigger>
                  <TabsTrigger value="submitted">Submetidos</TabsTrigger>
                  <TabsTrigger value="settings">Definições</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Informações Pessoais
                      </CardTitle>
                      <CardDescription>
                        Atualize as suas informações de contacto e perfil
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Nome</label>
                          <Input
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            disabled={!isEditing}
                            placeholder="Seu nome completo"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Email</label>
                          <Input
                            value={formData.email}
                            disabled
                            className="bg-background"
                            placeholder="seu@email.com"
                          />
                          <p className="text-xs text-primary/50 mt-1">
                            O email não pode ser alterado
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Telefone</label>
                          <Input
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            disabled={!isEditing}
                            placeholder="+351 123 456 789"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Localização</label>
                          <Input
                            value={formData.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            disabled={!isEditing}
                            placeholder="Leiria, Portugal"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Biografia</label>
                        <Textarea
                          value={formData.bio}
                          onChange={(e) => handleInputChange("bio", e.target.value)}
                          disabled={!isEditing}
                          placeholder="Conte-nos um pouco sobre si..."
                          rows={3}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Website</label>
                        <Input
                          value={formData.website}
                          onChange={(e) => handleInputChange("website", e.target.value)}
                          disabled={!isEditing}
                          placeholder="https://seu-site.com"
                        />
                      </div>

                      {isEditing && (
                        <div className="flex space-x-3 pt-4">
                          <Button onClick={handleSave}>
                            <Save className="h-4 w-4 mr-2" />
                            Guardar Alterações
                          </Button>
                          <Button variant="outline" onClick={handleCancel}>
                            <X className="h-4 w-4 mr-2" />
                            Cancelar
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Favorites Tab */}
                <TabsContent value="favorites" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Heart className="h-5 w-5 mr-2" />
                        Eventos Favoritos
                      </CardTitle>
                      <CardDescription>
                        Os eventos que marcou como favoritos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {favoriteEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {favoriteEvents.map((event) => (
                            <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-start space-x-3">
                                <img 
                                  src={event.image} 
                                  alt={event.title}
                                  className="w-16 h-12 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">{event.title}</h4>
                                  <p className="text-xs text-primary/50">{event.category}</p>
                                  <div className="flex items-center space-x-2 mt-2">
                                    <Calendar className="h-3 w-3 text-primary/40" />
                                    <span className="text-xs text-primary/60">{event.date}</span>
                                    <MapPin className="h-3 w-3 text-primary/40" />
                                    <span className="text-xs text-primary/60">{event.location}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Heart className="h-12 w-12 text-primary/40 mx-auto mb-4" />
                          <p className="text-primary/50">Ainda não tem eventos favoritos</p>
                          <p className="text-sm text-primary/40">
                            Explore eventos e marque-os como favoritos
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Submitted Events Tab */}
                <TabsContent value="submitted" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <BookOpen className="h-5 w-5 mr-2" />
                        Eventos Submetidos
                      </CardTitle>
                      <CardDescription>
                        Os eventos que submeteu para aprovação
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {submittedEvents.length > 0 ? (
                        <div className="space-y-4">
                          {submittedEvents.map((event) => (
                            <div key={event.id} className="border rounded-lg p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3">
                                  <img 
                                    src={event.image} 
                                    alt={event.title}
                                    className="w-16 h-12 object-cover rounded"
                                  />
                                  <div>
                                    <h4 className="font-medium">{event.title}</h4>
                                    <p className="text-sm text-primary/50">{event.category}</p>
                                    <div className="flex items-center space-x-4 mt-2 text-xs text-primary/60">
                                      <span>{event.date}</span>
                                      <span>{event.location}</span>
                                      <span>{event.price}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {getStatusBadge(event.status)}
                                  <div className="text-xs text-primary/50">
                                    <div className="flex items-center space-x-1">
                                      <Eye className="h-3 w-3" />
                                      <span>{event.views}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Heart className="h-3 w-3" />
                                      <span>{event.favorites}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <BookOpen className="h-12 w-12 text-primary/40 mx-auto mb-4" />
                          <p className="text-primary/50">Ainda não submeteu eventos</p>
                          <p className="text-sm text-primary/40">
                            Partilhe eventos com a comunidade
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Settings className="h-5 w-5 mr-2" />
                        Definições da Conta
                      </CardTitle>
                      <CardDescription>
                        Gerencie as suas preferências e configurações
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3">Notificações</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Notificações por email</span>
                            <Button variant="outline" size="sm">Ativar</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Lembretes de eventos</span>
                            <Button variant="outline" size="sm">Ativar</Button>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3">Privacidade</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Perfil público</span>
                            <Button variant="outline" size="sm">Público</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Mostrar email</span>
                            <Button variant="outline" size="sm">Oculto</Button>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-3">Segurança</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Alterar password</span>
                            <Button variant="outline" size="sm">Alterar</Button>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Autenticação de dois fatores</span>
                            <Button variant="outline" size="sm">Configurar</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
