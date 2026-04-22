import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MessageCircle, Mail, Phone, FileText, Users, Calendar, Heart, Settings, Shield } from "lucide-react"
import Link from "next/link"

const faqCategories = [
  {
    title: "Conta e Perfil",
    icon: Users,
    questions: [
      {
        question: "Como criar uma conta?",
        answer:
          "Clique em 'Entrar' no canto superior direito e depois em 'Criar conta nova'. Preencha os seus dados e confirme o email.",
      },
      {
        question: "Como alterar a minha palavra-passe?",
        answer:
          "Vá às Configurações > Segurança e clique em 'Alterar palavra-passe'. Será enviado um email de confirmação.",
      },
      {
        question: "Posso eliminar a minha conta?",
        answer:
          "Sim, nas Configurações encontrará a opção 'Eliminar Conta' na zona perigosa. Esta ação é irreversível.",
      },
    ],
  },
  {
    title: "Eventos",
    icon: Calendar,
    questions: [
      {
        question: "Como submeter um evento?",
        answer:
          "Clique em 'Submeter' no menu principal. Preencha todos os campos obrigatórios e aguarde aprovação da nossa equipa.",
      },
      {
        question: "Quanto tempo demora a aprovação?",
        answer:
          "Normalmente aprovamos eventos em 24-48 horas. Receberá um email quando o evento for aprovado ou rejeitado.",
      },
      {
        question: "Posso editar um evento após submissão?",
        answer:
          "Sim, na página 'Meus Eventos' pode editar eventos pendentes ou aprovados. Alterações podem requerer nova aprovação.",
      },
      {
        question: "O serviço é gratuito?",
        answer: "Sim! A submissão e divulgação de eventos na LeiriAgenda é completamente gratuita.",
      },
    ],
  },
  {
    title: "Favoritos",
    icon: Heart,
    questions: [
      {
        question: "Como adicionar eventos aos favoritos?",
        answer: "Clique no ícone de coração em qualquer evento. Precisa de estar logado para usar esta funcionalidade.",
      },
      {
        question: "Onde vejo os meus favoritos?",
        answer: "Clique em 'Favoritos' no menu principal ou no seu perfil para ver todos os eventos guardados.",
      },
      {
        question: "Há limite de favoritos?",
        answer: "Não, pode adicionar quantos eventos quiser aos seus favoritos.",
      },
    ],
  },
  {
    title: "Privacidade e Segurança",
    icon: Shield,
    questions: [
      {
        question: "Como são protegidos os meus dados?",
        answer:
          "Utilizamos encriptação SSL e seguimos as melhores práticas de segurança. Consulte a nossa Política de Privacidade.",
      },
      {
        question: "Posso controlar a visibilidade do meu perfil?",
        answer: "Sim, nas Configurações pode definir se o seu perfil é público, privado ou visível apenas para amigos.",
      },
      {
        question: "Como desativar notificações?",
        answer: "Vá às Configurações > Notificações e desative os tipos de notificação que não deseja receber.",
      },
    ],
  },
]

const quickLinks = [
  { title: "Submeter Evento", href: "/submeter", icon: Calendar },
  { title: "Meus Eventos", href: "/meus-eventos", icon: FileText },
  { title: "Favoritos", href: "/favoritos", icon: Heart },
  { title: "Configurações", href: "/configuracoes", icon: Settings },
]

export default function HelpPage() {
  return (
    <div className="flex-1 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Centro de Ajuda</h1>
            <p className="text-primary/60 max-w-2xl mx-auto mb-8">
              Encontre respostas às suas perguntas ou entre em contacto connosco
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/40 h-5 w-5" />
              <Input placeholder="Procurar na ajuda..." className="pl-10 py-3 text-lg" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {quickLinks.map((link) => (
              <Link key={link.title} href={link.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <link.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-medium text-foreground">{link.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground text-center">Perguntas Frequentes</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {faqCategories.map((category) => (
                <Card key={category.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <category.icon className="h-5 w-5 mr-2 text-primary" />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <div key={index} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
                        <h4 className="font-medium text-foreground mb-2">{faq.question}</h4>
                        <p className="text-sm text-primary/60">{faq.answer}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Ainda precisa de ajuda?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">Chat ao Vivo</h3>
                  <p className="text-sm text-primary/60 mb-4">Fale connosco em tempo real</p>
                  <Button className="bg-primary hover:bg-primary/90 text-white">Iniciar Chat</Button>
                </div>

                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">Email</h3>
                  <p className="text-sm text-primary/60 mb-4">Resposta em 24 horas</p>
                  <Link href="/contacto">
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                    >
                      Enviar Email
                    </Button>
                  </Link>
                </div>

                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-2">Telefone</h3>
                  <p className="text-sm text-primary/60 mb-4">Seg-Sex: 9h-18h</p>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                  >
                    +351 244 000 000
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Popular Articles */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Artigos Populares</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Como criar um evento de sucesso",
                "Dicas para promover o seu evento",
                "Guia completo de funcionalidades",
                "Melhores práticas de segurança",
                "Como usar os filtros de pesquisa",
                "Gerir notificações eficazmente",
              ].map((article, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <FileText className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{article}</h3>
                        <p className="text-sm text-primary/60">Guia passo a passo</p>
                        <Badge variant="secondary" className="mt-2 text-xs">
                          5 min de leitura
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
