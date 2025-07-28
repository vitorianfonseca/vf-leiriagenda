import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Clock, Users, Heart, Share2, ArrowLeft } from "lucide-react"

// Mock data for event detail
const eventData = {
  id: "1",
  title: "Festival de Música de Leiria 2024",
  description:
    "O Festival de Música de Leiria regressa em 2024 com uma programação excecional que celebra a diversidade musical. Este evento único reúne artistas locais e nacionais numa noite inesquecível no coração da cidade histórica de Leiria.\n\nDesfrute de performances ao vivo, food trucks com sabores regionais e uma atmosfera mágica no Teatro José Lúcio da Silva. Um evento imperdível para todos os amantes da música.",
  date: "15 de Dezembro, 2024",
  time: "20:00",
  endTime: "23:30",
  location: "Teatro José Lúcio da Silva",
  address: "Largo 5 de Outubro, 2400-109 Leiria",
  image: "/placeholder.svg?height=400&width=800",
  price: "€25",
  category: "Música",
  isFree: false,
  organizer: "Câmara Municipal de Leiria",
  capacity: 500,
  attendees: 342,
  tags: ["Música", "Festival", "Cultura", "Leiria"],
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-[#D4AF37] transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos eventos
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="relative mb-6">
              <Image
                src={eventData.image || "/placeholder.svg"}
                alt={eventData.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4">
                <Badge className={`${eventData.isFree ? "bg-green-500" : "bg-[#D4AF37]"} text-white text-lg px-3 py-1`}>
                  {eventData.isFree ? "Gratuito" : eventData.price}
                </Badge>
              </div>
            </div>

            {/* Event Info */}
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="mb-4">
                <Badge variant="secondary" className="mb-2">
                  {eventData.category}
                </Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{eventData.title}</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3 text-[#D4AF37]" />
                  <div>
                    <div className="font-medium">{eventData.date}</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3 text-[#D4AF37]" />
                  <div>
                    <div className="font-medium">
                      {eventData.time} - {eventData.endTime}
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-[#D4AF37]" />
                  <div>
                    <div className="font-medium">{eventData.location}</div>
                    <div className="text-sm">{eventData.address}</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3 text-[#D4AF37]" />
                  <div>
                    <div className="font-medium">{eventData.attendees} participantes</div>
                    <div className="text-sm">de {eventData.capacity} lugares</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Sobre o Evento</h2>
                <div className="text-gray-700 whitespace-pre-line leading-relaxed">{eventData.description}</div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Organizador</h3>
                <p className="text-gray-700">{eventData.organizer}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {eventData.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-[#D4AF37] text-[#D4AF37]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">
                    {eventData.isFree ? "Gratuito" : eventData.price}
                  </div>
                  <p className="text-gray-600">por pessoa</p>
                </div>

                <div className="space-y-3 mb-6">
                  <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white text-lg py-3">
                    {eventData.isFree ? "Reservar Lugar" : "Comprar Bilhete"}
                  </Button>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white bg-transparent"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Favorito
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white bg-transparent"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Partilhar
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-3">Detalhes Rápidos</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Data:</span>
                      <span className="font-medium">15 Dez 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hora:</span>
                      <span className="font-medium">20:00 - 23:30</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Local:</span>
                      <span className="font-medium">Teatro José Lúcio</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Categoria:</span>
                      <span className="font-medium">Música</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6 mt-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Lugares ocupados</span>
                      <span className="text-sm font-medium">
                        {Math.round((eventData.attendees / eventData.capacity) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#D4AF37] h-2 rounded-full"
                        style={{ width: `${(eventData.attendees / eventData.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {eventData.capacity - eventData.attendees} lugares disponíveis
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
