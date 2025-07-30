import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

// Mock data for all events
const allEvents = [
  {
    id: "1",
    title: "Festival de Música de Leiria 2024",
    date: "15 Dez",
    time: "20:00",
    location: "Teatro José Lúcio da Silva",
    image: "/placeholder.svg?height=200&width=400&text=Festival+de+Música",
    price: "€25",
    category: "Música",
    isFree: false,
  },
  {
    id: "2",
    title: "Mercado de Natal do Castelo",
    date: "20 Dez",
    time: "10:00",
    location: "Castelo de Leiria",
    image: "/placeholder.svg?height=200&width=400&text=Mercado+de+Natal",
    price: "Gratuito",
    category: "Cultura",
    isFree: true,
  },
  {
    id: "3",
    title: "Workshop de Cerâmica Tradicional",
    date: "22 Dez",
    time: "14:30",
    location: "Centro Cultural de Leiria",
    image: "/placeholder.svg?height=200&width=400&text=Workshop+Cerâmica",
    price: "€15",
    category: "Workshop",
    isFree: false,
  },
  {
    id: "4",
    title: "Caminhada pela Mata Nacional",
    date: "28 Dez",
    time: "09:00",
    location: "Mata Nacional de Leiria",
    image: "/placeholder.svg?height=200&width=400&text=Caminhada+Mata",
    price: "Gratuito",
    category: "Desporto",
    isFree: true,
  },
  {
    id: "5",
    title: "Exposição de Arte Contemporânea",
    date: "30 Dez",
    time: "15:00",
    location: "Galeria Municipal",
    image: "/placeholder.svg?height=200&width=400&text=Exposição+Arte",
    price: "€8",
    category: "Arte",
    isFree: false,
  },
  {
    id: "6",
    title: "Concerto de Ano Novo",
    date: "31 Dez",
    time: "23:00",
    location: "Praça Rodrigues Lobo",
    image: "/placeholder.svg?height=200&width=400&text=Concerto+Ano+Novo",
    price: "Gratuito",
    category: "Música",
    isFree: true,
  },
  {
    id: "7",
    title: "Feira de Artesanato Local",
    date: "5 Jan",
    time: "10:00",
    location: "Jardim Luís de Camões",
    image: "/placeholder.svg?height=200&width=400&text=Feira+Artesanato",
    price: "Gratuito",
    category: "Cultura",
    isFree: true,
  },
  {
    id: "8",
    title: "Torneio de Ténis Municipal",
    date: "8 Jan",
    time: "14:00",
    location: "Complexo Desportivo",
    image: "/placeholder.svg?height=200&width=400&text=Torneio+Ténis",
    price: "€10",
    category: "Desporto",
    isFree: false,
  },
  {
    id: "9",
    title: "Noite de Fado Tradicional",
    date: "12 Jan",
    time: "21:00",
    location: "Casa do Fado",
    image: "/placeholder.svg?height=200&width=400&text=Noite+Fado",
    price: "€20",
    category: "Música",
    isFree: false,
  },
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Todos os Eventos</h1>
          <p className="text-gray-600">Descubra tudo o que está a acontecer em Leiria</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Procurar eventos..." className="pl-10" />
            </div>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                <SelectItem value="musica">Música</SelectItem>
                <SelectItem value="arte">Arte</SelectItem>
                <SelectItem value="cultura">Cultura</SelectItem>
                <SelectItem value="desporto">Desporto</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Data" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as datas</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="tomorrow">Amanhã</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mês</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os preços</SelectItem>
                <SelectItem value="free">Gratuito</SelectItem>
                <SelectItem value="paid">Pago</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
              🎵 Música (3)
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
              🎨 Arte (2)
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
              🏛️ Cultura (2)
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
              ⚽ Desporto (2)
            </Badge>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{allEvents.length} eventos encontrados</h2>
            <p className="text-gray-600">Ordenados por data</p>
          </div>

          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Data</SelectItem>
              <SelectItem value="price">Preço</SelectItem>
              <SelectItem value="popularity">Popularidade</SelectItem>
              <SelectItem value="name">Nome</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {allEvents.map((event) => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
          >
            Carregar mais eventos
          </Button>
        </div>
      </div>
    </div>
  )
}
