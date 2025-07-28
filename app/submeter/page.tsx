"use client"

import type React from "react"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar, MapPin, Upload, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { FileUploadZone } from "@/components/file-upload-zone"

export default function SubmitEventPage() {
  const [isFree, setIsFree] = useState(false)
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
    website: "",
  })

  const [eventImage, setEventImage] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    alert("Evento submetido com sucesso! Será analisado pela nossa equipa.")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <AuthGuard message="Faça login para submeter um evento.">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-[#D4AF37] transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao início
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Submeter Evento</h1>
            <p className="text-gray-600 mt-2">Partilhe o seu evento com a comunidade de Leiria</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-[#D4AF37]" />
                    Informações Básicas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title">Título do Evento *</Label>
                    <Input
                      id="title"
                      placeholder="Ex: Festival de Música de Leiria 2024"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descrição *</Label>
                    <Textarea
                      id="description"
                      placeholder="Descreva o seu evento em detalhe..."
                      rows={5}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
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
                        <SelectItem value="musica">Música</SelectItem>
                        <SelectItem value="arte">Arte</SelectItem>
                        <SelectItem value="cultura">Cultura</SelectItem>
                        <SelectItem value="desporto">Desporto</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="gastronomia">Gastronomia</SelectItem>
                        <SelectItem value="tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="negócios">Negócios</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Date and Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Data e Horário</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-[#D4AF37]" />
                    Localização
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="location">Nome do Local *</Label>
                    <Input
                      id="location"
                      placeholder="Ex: Teatro José Lúcio da Silva"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Morada Completa *</Label>
                    <Input
                      id="address"
                      placeholder="Ex: Largo 5 de Outubro, 2400-109 Leiria"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle>Preços e Capacidade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Switch id="free-event" checked={isFree} onCheckedChange={setIsFree} />
                    <Label htmlFor="free-event">Evento gratuito</Label>
                  </div>

                  {!isFree && (
                    <div>
                      <Label htmlFor="price">Preço (€) *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="25.00"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        required={!isFree}
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="capacity">Capacidade Máxima</Label>
                    <Input
                      id="capacity"
                      type="number"
                      placeholder="500"
                      value={formData.capacity}
                      onChange={(e) => handleInputChange("capacity", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Organizer Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Organizador</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="organizer">Nome/Organização *</Label>
                      <Input
                        id="organizer"
                        placeholder="Ex: Câmara Municipal de Leiria"
                        value={formData.organizer}
                        onChange={(e) => handleInputChange("organizer", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email de Contacto *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="contacto@exemplo.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        placeholder="+351 244 000 000"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        placeholder="https://www.exemplo.com"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Image Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-[#D4AF37]" />
                    Imagem do Evento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FileUploadZone
                    onFileSelect={(file, previewUrl) => {
                      setEventImage(previewUrl)
                      console.log("Ficheiro selecionado:", file.name)
                    }}
                    currentImage={eventImage}
                    maxSize={5}
                  />
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  Guardar Rascunho
                </Button>
                <Button type="submit" className="bg-[#D4AF37] hover:bg-[#B8941F] text-white px-8">
                  Submeter Evento
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
