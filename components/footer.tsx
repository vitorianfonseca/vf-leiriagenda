import Link from "next/link"

const LINKS = [
  ["Eventos", "/eventos"],
  ["Submeter", "/submeter"],
  ["Sobre", "/sobre"],
  ["Contacto", "/contacto"],
  ["Privacidade", "/privacidade"],
  ["Termos", "/termos"],
] as const

export function Footer() {
  return (
    <footer className="mt-24 px-5 pb-10 md:px-10">
      <div className="mx-auto max-w-[1240px] border-t hair pt-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="relative w-fit">
            <p className="t-heavy text-[clamp(44px,8vw,120px)]">Leiri</p>
            <p className="t-thin text-[clamp(44px,8vw,120px)]">Agenda</p>
            <span aria-hidden className="t-script absolute bottom-[-0.1em] left-[52%] whitespace-nowrap text-[clamp(60px,10vw,150px)]" style={{ rotate: "-7deg" }}>
              até já
            </span>
          </div>
          <nav className="grid grid-cols-2 gap-x-12 gap-y-3 text-[15px]" aria-label="Rodapé">
            {LINKS.map(([label, href]) => (
              <Link key={href} href={href} className="link-line w-fit">{label}</Link>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 text-[13px] text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} LeiriAgenda. O que se passa em Leiria, todos os dias.</p>
          <p>
            Feito por{" "}
            <a href="https://bynexa.dev" target="_blank" rel="noopener noreferrer" className="link-line">Nexa</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
