"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowUpRight, Search } from "lucide-react"

import { AgendaList } from "@/components/editorial/agenda-list"
import { PosterFace } from "@/components/editorial/poster-face"
import { Deck3D } from "@/components/motion/Deck3D"
import { cleanText, groupByDay, matchesWhen, monthLong, parseEventDate, upcoming, weekday, type AgendaEvent } from "@/lib/agenda"
import eventsData from "@/data/events.json"

const ALL = eventsData.events as AgendaEvent[]

export default function HomePage() {
  const router = useRouter()
  const now = useMemo(() => new Date(), [])
  const next = useMemo(() => upcoming(ALL, now), [now])
  const today = next.filter((e) => matchesWhen(parseEventDate(e.date), "hoje", now))
  const weekend = next.filter((e) => matchesWhen(parseEventDate(e.date), "fim-de-semana", now))
  const venues = new Set(next.map((e) => e.location)).size

  // O baralho mostra os próximos eventos que têm cartaz.
  const posters = useMemo(() => groupByDay(next).flatMap((g) => g.events).filter((e) => e.image).slice(0, 9), [next])
  const [card, setCard] = useState(Math.min(2, Math.max(posters.length - 1, 0)))
  const [query, setQuery] = useState("")

  const search = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(query.trim() ? `/eventos?q=${encodeURIComponent(query.trim())}` : "/eventos")
  }

  return (
    <main className="mx-auto w-full max-w-[1240px] px-5 pt-10 md:px-10 md:pt-14">
      {/* ── Abertura: as três letras e o baralho de cartazes ───────────────── */}
      <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div className="relative">
          <p className="t-label mb-5 first-letter:uppercase">{weekday(now)}, {now.getDate()} de {monthLong(now)}</p>
          <div className="relative w-fit">
            <h1 className="relative z-[1]">
              <span className="rise"><span className="t-heavy block text-[clamp(64px,11vw,176px)]">Leiria</span></span>
              <span className="rise" data-d="1"><span className="t-thin block text-[clamp(64px,11vw,176px)]">Agenda</span></span>
            </h1>
            <span aria-hidden className="t-script draw absolute bottom-[-0.18em] left-[38%] z-[2] whitespace-nowrap text-[clamp(96px,15vw,240px)]" style={{ rotate: "-7deg" }}>
              hoje
            </span>
          </div>

          <p className="relative z-[3] mt-10 max-w-md text-[18px] leading-relaxed text-[hsl(var(--ink))]">
            {today.length > 0
              ? `Há ${today.length} ${today.length === 1 ? "evento" : "eventos"} hoje em Leiria`
              : "Hoje não há eventos marcados em Leiria"}
            {weekend.length > 0 ? ` e ${weekend.length} no fim de semana.` : "."}
          </p>

          <form onSubmit={search} className="relative z-[3] mt-7 flex max-w-md items-center gap-2 rounded-full border border-[hsl(var(--ink)/0.22)] py-1.5 pl-5 pr-1.5 transition-colors focus-within:border-[hsl(var(--ink))]">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Procurar eventos"
              placeholder="Concerto, teatro, um sítio…"
              className="min-w-0 flex-1 bg-transparent text-[15px] text-[hsl(var(--ink))] outline-none placeholder:text-muted-foreground"
            />
            <button type="submit" className="h-10 rounded-full bg-[hsl(var(--ink))] px-5 text-[14px] font-medium text-[hsl(var(--background))] transition-colors duration-300 hover:bg-[hsl(var(--azul))] hover:text-white">
              Procurar
            </button>
          </form>
        </div>

        {posters.length > 0 && (
          <div className="relative hidden lg:block">
            <Deck3D
              items={posters.map((e) => ({ id: e.id, label: cleanText(e.title), face: <PosterFace event={e} /> }))}
              active={card}
              onActiveChange={setCard}
              onOpen={(id) => router.push(`/evento/${id}`)}
              cardWidth={280}
              cardHeight={380}
              ariaLabel="Próximos eventos"
            />
            <p className="t-label mt-3 text-center">
              <span className="t-num mr-2 text-[15px]">{card + 1} / {posters.length}</span>
              Escolhe um cartaz
            </p>
          </div>
        )}
      </section>

      {/* ── Três números ───────────────────────────────────────────────────── */}
      <section className="mt-20 grid gap-x-12 gap-y-8 sm:grid-cols-3">
        {[
          { label: "Hoje", value: today.length, unit: today.length === 1 ? "evento" : "eventos", href: "/eventos?quando=hoje" },
          { label: "Este fim de semana", value: weekend.length, unit: weekend.length === 1 ? "evento" : "eventos", href: "/eventos?quando=fim-de-semana" },
          { label: "Na agenda", value: next.length, unit: `em ${venues} sítios`, href: "/eventos" },
        ].map((f) => (
          <Link key={f.label} href={f.href} className="group border-t hair pt-4">
            <span className="flex items-center justify-between">
              <span className="t-label">{f.label}</span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--azul))]" />
            </span>
            <span className="mt-3 flex items-baseline gap-3">
              <span className="t-num text-[clamp(64px,7vw,104px)]">{f.value}</span>
              <span className="t-thin text-[24px] normal-case">{f.unit}</span>
            </span>
          </Link>
        ))}
      </section>

      {/* ── A agenda dos próximos dias ─────────────────────────────────────── */}
      <section className="mt-20">
        <div className="mb-6 flex items-end justify-between gap-6">
          <h2 className="t-thin text-[clamp(34px,4.4vw,64px)] normal-case">Nos próximos dias</h2>
          <Link href="/eventos" className="link-line mb-2 shrink-0 text-[15px]">Ver a agenda toda <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <AgendaList events={next} limitDays={4} />
      </section>

      {/* ── Convite a quem organiza ────────────────────────────────────────── */}
      <section className="mt-20 grid items-end gap-8 border-t hair pt-12 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="relative w-fit">
          <p className="t-heavy text-[clamp(44px,7.4vw,116px)]">Organizas</p>
          <p className="t-thin text-[clamp(44px,7.4vw,116px)]">um evento?</p>
          <span aria-hidden className="t-script absolute bottom-[-0.05em] right-[-0.12em] whitespace-nowrap text-[clamp(64px,10vw,150px)]" style={{ rotate: "-7deg" }}>
            mostra
          </span>
        </div>
        <div className="max-w-xs md:pb-3">
          <p className="text-[16px] leading-relaxed text-muted-foreground">Submete-o e aparece na agenda, ao lado dos eventos da cidade.</p>
          <Link href="/submeter" className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-[hsl(var(--ink))] px-7 text-[15px] font-medium text-[hsl(var(--background))] transition-colors duration-300 hover:bg-[hsl(var(--azul))] hover:text-white">
            Submeter evento <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
