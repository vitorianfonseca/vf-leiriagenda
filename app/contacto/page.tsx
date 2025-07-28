"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Mensagem enviada com sucesso!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Contacte-nos</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tem alguma questão ou sugestão? Estamos aqui para ajudar. Entre em contacto connosco!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Envie-nos uma Mensagem</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nome</Label>
                      <Input id="firstName" placeholder="João" required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Apelido</Label>
                      <Input id="lastName" placeholder="Silva" required />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="joao@exemplo.com" required />
                  </div>

                  <div>
                    <Label htmlFor="subject">Assunto</Label>
                    <Input id="subject" placeholder="Como posso ajudar?" required />
                  </div>

                  <div>
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea id="message" placeholder="Escreva a sua mensagem aqui..." rows={5} required />
                  </div>

                  <Button type="submit" className="w-full bg-[#C17C5D] hover:bg-[#A66A4D] text-white">
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-[#C17C5D] mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">contacto@leiria-agenda.pt</p>
                      <p className="text-gray-600">suporte@leiria-agenda.pt</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-[#C17C5D] mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Telefone</h3>
                      <p className="text-gray-600">+351 244 000 000</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-[#C17C5D] mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Morada</h3>
                      <p className="text-gray-600">
                        Rua Exemplo, 123
                        <br />
                        2400-000 Leiria
                        <br />
                        Portugal
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-[#C17C5D] mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Horário de Atendimento</h3>
                      <p className="text-gray-600">
                        Segunda a Sexta: 9:00 - 18:00
                        <br />
                        Sábado: 9:00 - 13:00
                        <br />
                        Domingo: Fechado
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Perguntas Frequentes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Como submeto um evento?</h4>
                    <p className="text-gray-600 text-sm">
                      Visite a página "Submeter" e preencha o formulário com todas as informações do seu evento.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Os eventos são gratuitos para divulgar?</h4>
                    <p className="text-gray-600 text-sm">
                      Sim! A divulgação de eventos na LeiriAgenda é completamente gratuita.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Quanto tempo demora a aprovação?</h4>
                    <p className="text-gray-600 text-sm">
                      Normalmente aprovamos eventos em 24-48 horas após a submissão.
                    </p>
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
