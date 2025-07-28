"use client"

import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useI18n } from "@/hooks/use-i18n"

// Mock data for events
const featuredEvents = [
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

export default function HomePage() {
  const { t } = useI18n()

  const categories = [
    { name: t("categories.music"), icon: "🎵", count: 8, key: "music" },
    { name: t("categories.art"), icon: "🎨", count: 6, key: "art" },
    { name: t("categories.culture"), icon: "🏛️", count: 5, key: "culture" },
    { name: t("categories.sports"), icon: "⚽", count: 4, key: "sports" },
    { name: t("categories.workshop"), icon: "🛠️", count: 3, key: "workshop" },
    { name: t("categories.gastronomy"), icon: "🍽️", count: 2, key: "gastronomy" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Screen */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 h-screen flex items-center">
        {/* Background Pattern - Castle com qualidade otimizada */}
        <div className="absolute inset-0 flex items-end justify-center pb-4">
          <div className="relative w-full h-full">
            <Image
              src="/images/leiria-castle-illustration.png"
              alt="Castelo de Leiria"
              fill
              className="object-contain opacity-15 dark:opacity-8 scale-[2.5] md:scale-[2.2] lg:scale-[2.0] translate-y-20 md:translate-y-16 lg:translate-y-12"
              priority
              quality={100}
              sizes="100vw"
              style={{
                imageRendering: "crisp-edges",
                filter: "contrast(1.1) saturate(1.1)",
              }}
            />
          </div>
          {/* Gradientes reduzidos para mais transparência no centro */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/5 to-white/60 dark:from-gray-900/60 dark:via-gray-900/5 dark:to-gray-900/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/70 dark:from-gray-900/60 dark:via-transparent dark:to-gray-900/70"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#D4AF37]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-200/20 rounded-full blur-lg"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 w-full flex items-center justify-center min-h-screen">
          <div className="max-w-4xl mx-auto text-center -mt-24">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 drop-shadow-lg">
              {t("hero.title")} <span className="text-[#D4AF37]">Leiria</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 mb-12 max-w-2xl mx-auto drop-shadow-md">
              {t("hero.subtitle")}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5 z-10" />
                <Input
                  placeholder={t("hero.searchPlaceholder")}
                  className="w-full pl-12 pr-32 py-4 text-lg border-2 border-[#D4AF37]/30 focus:border-[#D4AF37] rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-gray-900 dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-400 h-14 shadow-xl"
                />
                <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#D4AF37] hover:bg-[#B8941F] text-white rounded-full px-6 py-2 h-12 shadow-lg">
                  {t("hero.searchButton")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("events.featured")}</h2>
              <p className="text-gray-600 dark:text-gray-400">{t("events.featuredSubtitle")}</p>
            </div>
            <Link href="/eventos">
              <Button
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white bg-transparent"
              >
                {t("events.viewAll")}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t("categories.title")}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{t("categories.subtitle")}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.key} href={`/eventos?categoria=${category.key}`}>
                <div className="bg-white dark:bg-gray-700 p-6 rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-[#D4AF37] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {category.count} {t("categories.events")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#D4AF37]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t("cta.title")}</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{t("cta.subtitle")}</p>
          <Link href="/submeter">
            <Button size="lg" className="bg-white text-[#D4AF37] hover:bg-gray-100 font-semibold px-8 py-3">
              {t("cta.submitEvent")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
