"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"

import { AgendaList } from "@/components/editorial/agenda-list"
import { LineTabs } from "@/components/editorial/LineTabs"
import { PosterFace } from "@/components/editorial/poster-face"
import DataService from "@/lib/data-service"
import { cleanText, groupByDay, matchesWhen, parseEventDate, upcoming, type AgendaEvent, type When } from "@/lib/agenda"
import { cn } from "@/lib/utils"
import eventsData from "@/data/events.json"

const WHEN: { value: When; label: string }[] = [
  { value: "todos", label: "Tudo" },
  { value: "hoje", label: "Hoje" },
  { value: "fim-de-semana", label: "Fim de semana" },
  { value: "semana", label: "Próximos 7 dias" },
  { value: "mes", label: "Próximos 30 dias" },
]

const normalize = (text: string) => text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")

function Agenda() {
  const params = useSearchParams()
  const [events, setEvents] = useState<AgendaEvent[]>(() => eventsData.events as AgendaEvent[])
  const [query, setQuery] = useState(params.get("q") ?? "")
  const [when, setWhen] = useState<When>(() => (WHEN.some((w) => w.value === params.get("quando")) ? (params.get("quando") as When) : "todos"))
  const [venue, setVenue] = useState("todos")
  const [view, setView] = useState<"lista" | "cartazes">("cartazes")

  // Os eventos submetidos e aprovados vivem no dispositivo; juntam-se aos da cidade.
  useEffect(() => {
    try {
      const stored = DataService.getEvents().filter((e) => e.status === "approved")
      if (stored.length > 0) setEvents(stored as AgendaEvent[])
    } catch {
      // Sem acesso ao armazenamento, fica a agenda da cidade.
    }
  }, [])

  const now = useMemo(() => new Date(), [])
  const next = useMemo(() => upcoming(events, now), [events, now])
  const venues = useMemo(() => [...new Set(next.map((e) => cleanText(e.location)))].sort((a, b) => a.localeCompare(b, "pt")), [next])

  const shown = useMemo(() => {
    const q = normalize(query.trim())
    return next.filter((e) => {
      if (!matchesWhen(parseEventDate(e.date), when, now)) return false
      if (venue !== "todos" && cleanText(e.location) !== venue) return false
      if (!q) return true
      return [e.title, e.description, e.location, e.organizer, e.category].some((field) => normalize(cleanText(field)).includes(q))
    })
  }, [next, when, venue, query, now])

  const filtered = query.trim() !== "" || when !== "todos" || venue !== "todos"
  const clear = () => { setQuery(""); setWhen("todos"); setVenue("todos") }

  return (
    <main className="mx-auto w-full max-w-[1240px] px-5 pt-10 md:px-10 md:pt-14">
      <header className="mb-10 flex flex-col gap-8 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div className="relative w-fit">
          <h1>
            <span className="rise"><span className="t-heavy block text-[clamp(48px,8vw,128px)]">A agenda</span></span>
            <span className="rise" data-d="1"><span className="t-thin block text-[clamp(48px,8vw,128px)]">de Leiria</span></span>
          </h1>
          <span aria-hidden className="t-script draw absolute bottom-[-0.22em] left-[52%] whitespace-nowrap text-[clamp(70px,11vw,170px)]" style={{ rotate: "-7deg" }}>
            tudo
          </span>
        </div>
        <p className="max-w-xs text-[15px] leading-relaxed text-muted-foreground md:pb-2 md:text-right">
          <span className="t-num mr-1.5 text-[26px]">{shown.length}</span>
          {shown.length === 1 ? "evento" : "eventos"}{filtered ? " com estes filtros" : " de hoje em diante"}, por ordem de data.
        </p>
      </header>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <label className="flex h-11 flex-1 items-center gap-2 rounded-full border border-[hsl(var(--ink)/0.22)] px-5 transition-colors focus-within:border-[hsl(var(--ink))]">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Procurar eventos"
            placeholder="Procurar por nome, sítio ou organizador"
            className="min-w-0 flex-1 bg-transparent text-[15px] text-[hsl(var(--ink))] outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button type="button" aria-label="Limpar pesquisa" onClick={() => setQuery("")} className="text-muted-foreground hover:text-[hsl(var(--ink))]"><X className="h-4 w-4" /></button>
          )}
        </label>
        <select
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          aria-label="Sítio"
          className="h-11 max-w-full rounded-full border border-[hsl(var(--ink)/0.22)] bg-transparent px-5 text-[15px] text-[hsl(var(--ink))] outline-none transition-colors focus:border-[hsl(var(--ink))] md:max-w-[280px]"
        >
          <option value="todos">Todos os sítios</option>
          {venues.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
        <div className="flex h-11 shrink-0 items-center rounded-full border border-[hsl(var(--ink)/0.22)] p-1" role="group" aria-label="Vista">
          {(["cartazes", "lista"] as const).map((v) => (
            <button
              key={v}
              type="button"
              aria-pressed={view === v}
              onClick={() => setView(v)}
              className={cn("h-full rounded-full px-4 text-[14px] font-medium capitalize transition-colors duration-300", view === v ? "bg-[hsl(var(--ink))] text-[hsl(var(--background))]" : "text-muted-foreground hover:text-[hsl(var(--ink))]")}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <LineTabs className="mt-6 border-b-0" value={when} onChange={setWhen} options={WHEN} ariaLabel="Quando" />

      {shown.length === 0 ? (
        <div className="border-t hair py-16">
          <p className="t-thin text-[clamp(30px,3.6vw,48px)] normal-case">Nada com estes filtros.</p>
          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">Experimenta outro dia ou outro sítio, ou vê a agenda toda.</p>
          <button type="button" onClick={clear} className="link-line mt-6 text-[15px]">Limpar filtros</button>
        </div>
      ) : view === "lista" ? (
        <div key={`${when}-${venue}`} className="page-in"><AgendaList events={shown} /></div>
      ) : (
        <ul key={`${when}-${venue}-c`} className="page-in grid grid-cols-2 gap-x-5 gap-y-8 border-t hair pt-8 md:grid-cols-3 lg:grid-cols-4">
          {groupByDay(shown).flatMap((g) => g.events).map((event) => (
            <li key={event.id}>
              <Link href={`/evento/${event.id}`} className="group block">
                <span className="block aspect-[3/4] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:rotate-[-1.2deg]"><PosterFace event={event} /></span>
                <span className="mt-3 block text-[13px] text-muted-foreground">{event.time ? `${event.time} · ` : ""}{cleanText(event.location)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default function EventosPage() {
  return (
    <Suspense fallback={<main className="mx-auto min-h-[60vh] w-full max-w-[1240px] px-5 pt-14 md:px-10" aria-busy="true" />}>
      <Agenda />
    </Suspense>
  )
}
