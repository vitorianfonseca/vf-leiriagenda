"use client"

import { AuthGuard } from "@/components/auth-guard"
import { EventCard } from "@/components/event-card"
import { useAuth } from "@/contexts/auth-context"

// Mock data for all events (to filter favorites from)
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
]

function FavoritesContent() {
  const { user } = useAuth()

  // Filter events to show only favorites
  const favoriteEvents = allEvents.filter((event) => user?.favorites?.includes(event.id))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Eventos Favoritos</h1>
          <p className="text-gray-600">Os eventos que guardou para mais tarde ({favoriteEvents.length} eventos)</p>
        </div>

        {favoriteEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum evento favorito</h3>
            <p className="text-gray-600 mb-4">Comece a explorar eventos e adicione aos seus favoritos!</p>
            <a
              href="/eventos"
              className="inline-flex items-center px-4 py-2 bg-[#D4AF37] text-white rounded-md hover:bg-[#B8941F] transition-colors"
            >
              Explorar Eventos
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default function FavoritesPage() {
  return (
    <AuthGuard message="Faça login para ver os seus eventos favoritos.">
      <FavoritesContent />
    </AuthGuard>
  )
}
