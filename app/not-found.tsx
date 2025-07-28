import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <Calendar className="h-24 w-24 text-[#D4AF37] mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Página não encontrada</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            A página que procura não existe ou foi movida. Que tal descobrir alguns eventos fantásticos?
          </p>
        </div>

        <div className="space-x-4">
          <Link href="/">
            <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
              <Home className="h-4 w-4 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
          <Link href="/eventos">
            <Button
              variant="outline"
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white bg-transparent"
            >
              Ver Eventos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
