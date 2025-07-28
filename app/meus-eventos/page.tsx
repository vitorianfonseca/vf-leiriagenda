import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

// Mock data for user's events
const userEvents = [
  {
    id: "1",
    title: "Workshop de Fotografia",
    date: "2024-01-15",
    time: "14:00",
    location: "Centro Cultural",
    status: "approved",
    attendees: 12,
    capacity: 20,
  },
  {
    id: "2",
    title: "Concerto de Jazz",
    date: "2024-01-20",
    time: "21:00",
    location: "Café Central",
    status: "pending",
    attendees: 0,
    capacity: 50,
  },
  {
    id: "3",
    title: "Feira de Artesanato",
    date: "2024-01-10",
    time: "10:00",
    location: "Praça Central",
    status: "rejected",
    attendees: 0,
    capacity: 100,
  },
]

export default function MyEventsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500 text-white">Aprovado</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 text-white">Pendente</Badge>
      case "rejected":
        return <Badge className="bg-red-500 text-white">Rejeitado</Badge>
      default:
        return <Badge variant="secondary">Desconhecido</Badge>
    }
  }

  return (
    <AuthGuard message="Faça login para ver os seus eventos.">
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Eventos</h1>
              <p className="text-gray-600">Gerir os eventos que submeteu</p>
            </div>
            <Link href="/submeter">
              <Button className="bg-[#C17C5D] hover:bg-[#A66A4D] text-white">Submeter Novo Evento</Button>
            </Link>
          </div>

          {userEvents.length > 0 ? (
            <div className="space-y-6">
              {userEvents.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      {getStatusBadge(event.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-[#C17C5D]" />
                        <span>
                          {new Date(event.date).toLocaleDateString("pt-PT")} às {event.time}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-[#C17C5D]" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2 text-[#C17C5D]" />
                        <span>
                          {event.attendees}/{event.capacity} participantes
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Link href={`/evento/${event.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </Button>
                      </Link>
                      {event.status !== "rejected" && (
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum evento submetido</h3>
              <p className="text-gray-600 mb-4">Comece a partilhar os seus eventos com a comunidade!</p>
              <Link href="/submeter">
                <Button className="bg-[#C17C5D] hover:bg-[#A66A4D] text-white">Submeter Primeiro Evento</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
