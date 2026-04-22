import Link from "next/link"
import { Calendar } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/40 text-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="h-5 w-5 text-foreground" />
              <span className="font-display text-2xl font-light tracking-wide text-foreground">LeiriAgenda</span>
            </div>
            <p className="text-primary/60 text-sm font-sans font-light max-w-xs leading-relaxed">
              Descubra os melhores eventos culturais, sociais e criativos em Leiria.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 text-sm font-sans">
            <div>
              <p className="text-primary/40 text-xs tracking-widest uppercase mb-3">Navegação</p>
              <div className="flex flex-col space-y-2">
                <Link href="/eventos" className="text-primary/60 hover:text-foreground transition-colors">Eventos</Link>
                <Link href="/submeter" className="text-primary/60 hover:text-foreground transition-colors">Submeter</Link>
                <Link href="/sobre" className="text-primary/60 hover:text-foreground transition-colors">Sobre</Link>
              </div>
            </div>
            <div>
              <p className="text-primary/40 text-xs tracking-widest uppercase mb-3">Legal</p>
              <div className="flex flex-col space-y-2">
                <Link href="/privacidade" className="text-primary/60 hover:text-foreground transition-colors">Privacidade</Link>
                <Link href="/termos" className="text-primary/60 hover:text-foreground transition-colors">Termos</Link>
                <Link href="/contacto" className="text-primary/60 hover:text-foreground transition-colors">Contacto</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-primary/40 text-xs font-sans">© 2024 LeiriAgenda. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <p className="text-primary/30 text-xs font-sans">Leiria, Portugal</p>
            <p className="text-xs text-primary/40 font-sans">
              Built by{" "}
              <a
                href="https://bynexa.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground font-medium hover:underline transition-all"
              >
                Nexa ↗
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
