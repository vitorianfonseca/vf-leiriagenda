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
    name: "Vitória Fonseca",
    role: "Frontend & Design",
    bio: "Responsável pela experiência visual e interfaces da LeiriAgenda, com foco em design refinado e acessível.",
    image: "/team/vitoria.png",
    social: {
      linkedin: "#",
      email: "vitoria@leiriagenda.pt",
    },
  },
  {
    name: "João Santos",
    role: "Marketing & Comunicação",
    bio: "Responsável pela presença da LeiriAgenda na comunidade e pela comunicação com organizadores e utilizadores.",
    image: "/team/joao.jpeg",
    social: {
      linkedin: "#",
      email: "joao@leiriagenda.pt",
    },
  },
  {
    name: "Diogo Fernandes",
    role: "Backend & Infraestrutura",
    bio: "Responsável pela arquitetura técnica, servidores e estabilidade da plataforma.",
    image: "/team/diogo.jpeg",
    social: {
      linkedin: "#",
      github: "#",
      email: "diogo@leiriagenda.pt",
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
    <div className="flex-1 bg-background">
      {/* Hero Section */}
      <section className="bg-card py-16 md:py-24 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-foreground">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Sobre a LeiriAgenda</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary/60">
              A plataforma que conecta Leiria através de eventos únicos e experiências inesquecíveis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center transform group-hover:translate-y-2 transition-transform duration-500">
              <Link href="/eventos">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/25">
                  Explorar Eventos
                </Button>
              </Link>
              <Link href="/submeter">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/25"
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
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-sm text-primary/60">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground text-center mb-8">A Nossa História</h2>
            <div className="prose prose-lg max-w-none text-primary/60">
              <p className="text-center mb-8">
                A LeiriAgenda nasceu da paixão por conectar pessoas através de experiências únicas. Em 2023, percebemos
                que Leiria tinha uma rica oferta cultural e social, mas faltava uma plataforma centralizada onde todos
                pudessem descobrir e partilhar eventos.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">O Problema</h3>
                  <p>
                    Eventos fantásticos aconteciam em Leiria, mas muitas vezes passavam despercebidos. Organizadores
                    tinham dificuldade em chegar ao seu público, e os residentes perdiam oportunidades de participar em
                    atividades do seu interesse.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">A Solução</h3>
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
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Os Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                  <p className="text-primary/60">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">A Nossa Equipa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="text-center border border-border/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden bg-muted border-2 border-border">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-display text-xl font-medium text-foreground mb-2">{member.name}</h3>
                  <Badge className="bg-primary/10 text-primary border-0 font-sans text-xs tracking-wide mb-4">{member.role}</Badge>
                  <p className="text-primary/60 text-sm font-sans leading-relaxed mb-6">{member.bio}</p>
                  <div className="flex justify-center space-x-3">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-primary/30 hover:text-primary transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {member.social.github && (
                      <a href={member.social.github} className="text-primary/30 hover:text-primary transition-colors">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    <a href={`mailto:${member.social.email}`} className="text-primary/30 hover:text-primary transition-colors">
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Community Impact */}
        <section className="mb-16">
          <Card className="bg-primary/10">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">Impacto na Comunidade</h2>
              <p className="text-lg text-primary/60 max-w-3xl mx-auto mb-8">
                Desde o nosso lançamento, já ajudámos centenas de organizadores a divulgar os seus eventos e milhares de
                pessoas a descobrir experiências únicas em Leiria. Continuamos comprometidos em fortalecer os laços da
                nossa comunidade.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">95%</div>
                  <div className="text-primary/60">Satisfação dos utilizadores</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">24h</div>
                  <div className="text-primary/60">Tempo médio de aprovação</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-primary/60">Gratuito para todos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Junte-se à Nossa Comunidade</h2>
          <p className="text-lg text-primary/60 mb-8 max-w-2xl mx-auto">
            Seja parte da transformação cultural de Leiria. Descubra eventos incríveis ou partilhe os seus próprios.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/registo">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                Criar Conta Gratuita
              </Button>
            </Link>
            <Link href="/contacto">
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
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
