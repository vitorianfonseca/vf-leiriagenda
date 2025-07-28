import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, MapPin, Heart, Target, Lightbulb, Award, Mail, Linkedin, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const stats = [
  { label: "Eventos Publicados", value: "500+", icon: Calendar },
  { label: "Utilizadores Ativos", value: "10K+", icon: Users },
  { label: "Locais Parceiros", value: "50+", icon: MapPin },
  { label: "Eventos Favoritos", value: "25K+", icon: Heart },
]

const team = [
  {
    name: "Ana Silva",
    role: "Fundadora & CEO",
    bio: "Apaixonada por eventos e tecnologia, criou a LeiriAgenda para conectar a comunidade de Leiria.",
    image: "/placeholder.svg?height=200&width=200&text=Ana+Silva",
    social: {
      linkedin: "#",
      email: "ana@leiria-agenda.pt",
    },
  },
  {
    name: "João Santos",
    role: "CTO",
    bio: "Desenvolvedor experiente com foco em criar experiências digitais excepcionais.",
    image: "/placeholder.svg?height=200&width=200&text=João+Santos",
    social: {
      linkedin: "#",
      github: "#",
      email: "joao@leiria-agenda.pt",
    },
  },
  {
    name: "Maria Costa",
    role: "Community Manager",
    bio: "Especialista em comunidades digitais e eventos culturais em Leiria.",
    image: "/placeholder.svg?height=200&width=200&text=Maria+Costa",
    social: {
      linkedin: "#",
      email: "maria@leiria-agenda.pt",
    },
  },
]

const values = [
  {
    icon: Target,
    title: "Missão",
    description: "Conectar a comunidade de Leiria através de eventos únicos e experiências memoráveis.",
  },
  {
    icon: Lightbulb,
    title: "Visão",
    description: "Ser a plataforma de referência para descobrir e partilhar eventos em Leiria.",
  },
  {
    icon: Award,
    title: "Valores",
    description: "Transparência, qualidade, inovação e compromisso com a comunidade local.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#D4AF37] to-[#B8941F] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Sobre a LeiriAgenda</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              A plataforma que conecta Leiria através de eventos únicos e experiências inesquecíveis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/eventos">
                <Button size="lg" className="bg-white text-[#D4AF37] hover:bg-gray-100">
                  Explorar Eventos
                </Button>
              </Link>
              <Link href="/submeter">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#D4AF37] bg-transparent"
                >
                  Submeter Evento
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-[#D4AF37] mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">A Nossa História</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="text-center mb-8">
                A LeiriAgenda nasceu da paixão por conectar pessoas através de experiências únicas. Em 2023, percebemos
                que Leiria tinha uma rica oferta cultural e social, mas faltava uma plataforma centralizada onde todos
                pudessem descobrir e partilhar eventos.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">O Problema</h3>
                  <p>
                    Eventos fantásticos aconteciam em Leiria, mas muitas vezes passavam despercebidos. Organizadores
                    tinham dificuldade em chegar ao seu público, e os residentes perdiam oportunidades de participar em
                    atividades do seu interesse.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">A Solução</h3>
                  <p>
                    Criámos uma plataforma intuitiva e gratuita onde qualquer pessoa pode descobrir eventos locais e
                    onde organizadores podem divulgar as suas atividades de forma simples e eficaz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Os Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">A Nossa Equipa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="p-8">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={200}
                    height={200}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <Badge className="bg-[#D4AF37] text-white mb-4">{member.role}</Badge>
                  <p className="text-gray-600 mb-6">{member.bio}</p>
                  <div className="flex justify-center space-x-4">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-gray-400 hover:text-[#D4AF37]">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} className="text-gray-400 hover:text-[#D4AF37]">
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                    <a href={`mailto:${member.social.email}`} className="text-gray-400 hover:text-[#D4AF37]">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Community Impact */}
        <section className="mb-16">
          <Card className="bg-gradient-to-r from-[#D4AF37]/10 to-[#B8941F]/10">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Impacto na Comunidade</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                Desde o nosso lançamento, já ajudámos centenas de organizadores a divulgar os seus eventos e milhares de
                pessoas a descobrir experiências únicas em Leiria. Continuamos comprometidos em fortalecer os laços da
                nossa comunidade.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">95%</div>
                  <div className="text-gray-600">Satisfação dos utilizadores</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">24h</div>
                  <div className="text-gray-600">Tempo médio de aprovação</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#D4AF37] mb-2">100%</div>
                  <div className="text-gray-600">Gratuito para todos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Junte-se à Nossa Comunidade</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Seja parte da transformação cultural de Leiria. Descubra eventos incríveis ou partilhe os seus próprios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/registo">
              <Button size="lg" className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
                Criar Conta Gratuita
              </Button>
            </Link>
            <Link href="/contacto">
              <Button
                size="lg"
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white bg-transparent"
              >
                Falar Connosco
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
