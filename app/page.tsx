"use client"

import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Music, Palette, Building2, Zap, Wrench, UtensilsCrossed } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useI18n } from "@/hooks/use-i18n"
import { AnimatedMeshGradient } from "@/components/animated-mesh-gradient"

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

  const categoryIcons = {
    music: Music,
    art: Palette,
    culture: Building2,
    sports: Zap,
    workshop: Wrench,
    gastronomy: UtensilsCrossed,
  }

  const categories = [
    { name: t("categories.music"), icon: categoryIcons.music, count: 8, key: "music" },
    { name: t("categories.art"), icon: categoryIcons.art, count: 6, key: "art" },
    { name: t("categories.culture"), icon: categoryIcons.culture, count: 5, key: "culture" },
    { name: t("categories.sports"), icon: categoryIcons.sports, count: 4, key: "sports" },
    { name: t("categories.workshop"), icon: categoryIcons.workshop, count: 3, key: "workshop" },
    { name: t("categories.gastronomy"), icon: categoryIcons.gastronomy, count: 2, key: "gastronomy" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Screen */}
      <section className="relative overflow-hidden h-screen flex items-center">
        {/* Animated Mesh Gradient Background */}
        <AnimatedMeshGradient />
        
        {/* Background Pattern - Castle com qualidade otimizada */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 z-10">
          <div className="relative w-full h-full">
            <Image
              src="/images/leiria-castle-illustration.png"
              alt="Castelo de Leiria"
              fill
              className="object-contain opacity-5 scale-[2.5] md:scale-[2.2] lg:scale-[2.0] translate-y-20 md:translate-y-16 lg:translate-y-12"
              priority
              quality={100}
              sizes="100vw"
              style={{
                imageRendering: "crisp-edges",
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 w-full flex items-center justify-center min-h-screen">
          <div className="max-w-4xl mx-auto text-center -mt-24">
            <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-primary/60 font-sans font-medium mb-5">
              Leiria, Portugal
            </p>
            <h1 className="font-display font-light text-5xl md:text-7xl lg:text-8xl mb-4 leading-[1.05] tracking-tight" style={{color: '#2A1505'}}>
              {t("hero.title")}{" "}
              <span className="italic font-semibold text-primary">Leiria</span>
            </h1>
            <div className="w-16 h-px bg-primary/40 mx-auto my-6" />
            <p className="text-lg md:text-xl text-primary/70 mb-12 max-w-xl mx-auto font-sans font-light leading-relaxed tracking-wide">
              {t("hero.subtitle")}
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/40 h-5 w-5 z-10" />
                <Input
                  placeholder={t("hero.searchPlaceholder")}
                  className="w-full pl-12 pr-36 py-4 text-base border border-primary/20 focus:border-primary/50 rounded-full bg-white/90 backdrop-blur-sm text-primary placeholder:text-primary/40 h-14 shadow-lg font-sans"
                />
                <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90 text-white rounded-full px-7 py-2 h-12 shadow-md transition-all duration-300 font-sans text-sm tracking-wide">
                  {t("hero.searchButton")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary/50 font-sans font-medium mb-2">Em destaque</p>
              <h2 className="font-display text-4xl md:text-5xl font-light text-foreground leading-tight">{t("events.featured")}</h2>
            </div>
            <Link href="/eventos">
              <Button
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary hover:text-white bg-transparent transition-all duration-300 font-sans text-sm tracking-wide rounded-full px-6"
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
      <section className="py-20 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-primary/50 font-sans font-medium mb-2">Explorar</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-3">{t("categories.title")}</h2>
            <p className="text-primary/60 max-w-xl mx-auto font-sans font-light leading-relaxed">{t("categories.subtitle")}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link key={category.key} href={`/eventos?categoria=${category.key}`}>
                  <div className="bg-card border border-border/60 p-5 rounded-xl text-center hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
                    <div className="flex justify-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/8 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-sans font-medium text-sm text-foreground mb-0.5">
                      {category.name}
                    </h3>
                    <p className="text-xs text-primary/50">
                      {category.count} {t("categories.events")}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-white/50 font-sans font-medium mb-4">O seu evento</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-white mb-4 leading-tight">{t("cta.title")}</h2>
          <div className="w-12 h-px bg-white/30 mx-auto my-5" />
          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto font-sans font-light leading-relaxed">{t("cta.subtitle")}</p>
          <Link href="/submeter">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-sans font-medium tracking-wide px-10 py-3 rounded-full shadow-lg transition-all duration-300">
              {t("cta.submitEvent")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
