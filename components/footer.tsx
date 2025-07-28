import Link from "next/link"
import { Calendar } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Calendar className="h-6 w-6 text-[#D4AF37]" />
            <span className="text-lg font-bold text-[#D4AF37]">LeiriAgenda</span>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-600">
            <p>© 2024 LeiriAgenda. Todos os direitos reservados.</p>
            <div className="flex space-x-4">
              <Link href="/privacidade" className="hover:text-[#D4AF37] transition-colors">
                Privacidade
              </Link>
              <Link href="/termos" className="hover:text-[#D4AF37] transition-colors">
                Termos
              </Link>
              <Link href="/contacto" className="hover:text-[#D4AF37] transition-colors">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
