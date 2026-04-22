import { AuthGuard } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Edit, Trash2, Eye, Music, Palette, Hammer, TreePine, Camera, Utensils, Gamepad2 } from "lucide-react"
import Link from "next/link"

// Mock data for user's events
const userEvents = [
  {
    id: "1",
    title: "Workshop de Fotografia",
    date: "2024-01-15",
    time: "14:00",
    location: "Centro Cultural",
    category: "Fotografia",
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
    category: "Música",
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
    category: "Arte",
    status: "rejected",
    attendees: 0,
    capacity: 100,
  },
]

export default function MyEventsPage() {
  // Função para obter o ícone baseado na categoria
  const getCategoryIcon = (category: string) => {
    const normalizedCategory = category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    
    switch (normalizedCategory) {
      case 'musica':
      case 'música':
        return Music
      case 'cultura':
      case 'arte':
        return Palette
      case 'workshop':
        return Hammer
      case 'desporto':
      case 'natureza':
        return TreePine
      case 'social':
        return Users
      case 'fotografia':
        return Camera
      case 'gastronomia':
        return Utensils
      case 'jogos':
        return Gamepad2
      default:
        return Calendar
    }
  }
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-palette-rose-warm text-white">Aprovado</Badge>
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
      <div className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Meus Eventos</h1>
              <p className="text-primary/60">Gerir os eventos que submeteu</p>
            </div>
            <Link href="/submeter">
              <Button className="bg-primary hover:bg-primary/90 text-white">Submeter Novo Evento</Button>
            </Link>
          </div>

          {userEvents.length > 0 ? (
            <div className="space-y-6">
              {userEvents.map((event) => {
                const CategoryIcon = getCategoryIcon(event.category)
                return (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-xl">{event.title}</CardTitle>
                          <Badge variant="secondary" className="text-xs shrink-0 px-2 py-1">
                            <CategoryIcon className="h-3 w-3 mr-1" />
                            {event.category}
                          </Badge>
                        </div>
                        {getStatusBadge(event.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center text-primary/60">
                          <Calendar className="h-4 w-4 mr-2 text-primary" />
                          <span>
                            {new Date(event.date).toLocaleDateString("pt-PT")} às {event.time}
                          </span>
                        </div>
                        <div className="flex items-center text-primary/60">
                          <MapPin className="h-4 w-4 mr-2 text-primary" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center text-primary/60">
                          <Users className="h-4 w-4 mr-2 text-primary" />
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
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-primary/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Nenhum evento submetido</h3>
              <p className="text-primary/60 mb-4">Comece a partilhar os seus eventos com a comunidade!</p>
              <Link href="/submeter">
                <Button className="bg-primary hover:bg-primary/90 text-white">Submeter Primeiro Evento</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
