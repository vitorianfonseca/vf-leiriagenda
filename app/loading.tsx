import { Calendar } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Calendar className="h-12 w-12 text-[#D4AF37] mx-auto mb-4 animate-pulse" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">A carregar eventos...</h2>
        <p className="text-gray-600">Por favor aguarde</p>
      </div>
    </div>
  )
}
