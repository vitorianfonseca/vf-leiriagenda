"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { FileUploadZone } from "@/components/file-upload-zone"
import { useToast } from "@/contexts/toast-context"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import DataService, { type Event } from "@/lib/data-service"
import { AuthGuard } from "@/components/auth-guard"

export default function SubmitEventPage() {
  const [isFree, setIsFree] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    endTime: "",
    location: "",
    address: "",
    category: "",
    price: "",
    capacity: "",
    organizer: "",
    email: "",
    phone: "",
    website: ""
  })
  const [eventImage, setEventImage] = useState<string | null>(null)
  const { addToast } = useToast()
  const { user } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      addToast("Precisa de estar autenticado para submeter um evento", "error")
      return
    }

    if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.location || !formData.category) {
      addToast("Por favor preencha todos os campos obrigatórios", "error")
      return
    }

    setIsSubmitting(true)
    
    try {
      const newEvent: Event = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        date: formData.date,
        time: formData.time,
        endTime: formData.endTime || undefined,
        location: formData.location,
        address: formData.address,
        category: formData.category,
        price: isFree ? "Gratuito" : formData.price,
        isFree,
        capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
        organizer: formData.organizer || user.name,
        email: formData.email || user.email,
        phone: formData.phone,
        website: formData.website,
        image: eventImage || "/placeholder.svg?height=200&width=400&text=Evento",
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        favorites: 0,
        views: 0
      }

      DataService.addEvent(newEvent)
      
      addToast("Evento submetido com sucesso! Será analisado pela nossa equipa.", "success")
      
      setTimeout(() => {
        router.push("/eventos")
      }, 2000)
      
    } catch (error) {
      console.error("Erro ao submeter evento:", error)
      addToast("Erro ao submeter evento. Tente novamente.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageSelect = (file: File, previewUrl: string) => {
    setEventImage(previewUrl)
  }

  return (
    <AuthGuard message="Precisa de iniciar sessão para submeter um evento.">
    <div className="flex-1 bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Submeter Evento</h1>
          <p className="text-primary/60">
            Partilhe o seu evento com a comunidade de Leiria
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Evento</CardTitle>
            <CardDescription>
              Preencha os detalhes do seu evento. Os campos marcados com * são obrigatórios.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Título do Evento *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Ex: Festival de Música de Leiria"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoria *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Música">Música</SelectItem>
                      <SelectItem value="Arte">Arte</SelectItem>
                      <SelectItem value="Cultura">Cultura</SelectItem>
                      <SelectItem value="Desporto">Desporto</SelectItem>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                      <SelectItem value="Teatro">Teatro</SelectItem>
                      <SelectItem value="Dança">Dança</SelectItem>
                      <SelectItem value="Literatura">Literatura</SelectItem>
                      <SelectItem value="Gastronomia">Gastronomia</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Descreva o seu evento em detalhes..."
                  rows={4}
                  required
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Data *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Hora de Início *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">Hora de Fim</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange("endTime", e.target.value)}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Local *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Ex: Teatro José Lúcio da Silva"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Endereço completo"
                  />
                </div>
              </div>

              {/* Price and Capacity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Switch
                      id="isFree"
                      checked={isFree}
                      onCheckedChange={setIsFree}
                    />
                    <Label htmlFor="isFree">Evento Gratuito</Label>
                  </div>
                  {!isFree && (
                    <Input
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="Ex: €25"
                    />
                  )}
                </div>
                <div>
                  <Label htmlFor="capacity">Capacidade</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange("capacity", e.target.value)}
                    placeholder="Número máximo de participantes"
                  />
                </div>
              </div>

              {/* Organizer Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="organizer">Organizador</Label>
                  <Input
                    id="organizer"
                    value={formData.organizer}
                    onChange={(e) => handleInputChange("organizer", e.target.value)}
                    placeholder={user?.name || "Nome do organizador"}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email de Contacto</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder={user?.email || "email@exemplo.com"}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+351 123 456 789"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://www.exemplo.com"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <Label>Imagem do Evento</Label>
                <FileUploadZone
                  onFileSelect={handleImageSelect}
                  acceptedTypes={["image/jpeg", "image/png", "image/webp"]}
                  maxSize={5}
                  className="mt-2"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-primary hover:bg-accent text-white hover:text-accent-foreground"
                >
                  {isSubmitting ? "A Submeter..." : "Submeter Evento"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
    </AuthGuard>
  )
}
