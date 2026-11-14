import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"

import { EventComments } from "@/components/event-comments"
import { QuickShareButton } from "@/components/social-sharing"
import { cleanText, groupByDay, monthLong, parseEventDate, upcoming, weekday, type AgendaEvent } from "@/lib/agenda"
import eventsData from "@/data/events.json"

const ALL = eventsData.events as AgendaEvent[]

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const event = ALL.find((e) => e.id === decodeURIComponent(id))
  return event ? { title: `${cleanText(event.title)} · LeiriAgenda`, description: cleanText(event.description).slice(0, 160) } : {}
}

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params
  const event = ALL.find((e) => e.id === decodeURIComponent(id))
  if (!event) notFound()

  const date = parseEventDate(event.date)
  const title = cleanText(event.title)
  const more = groupByDay(upcoming(ALL)).flatMap((g) => g.events).filter((e) => e.id !== event.id).slice(0, 4)

  return (
    <main className="mx-auto w-full max-w-[1240px] px-5 pt-10 md:px-10 md:pt-14">
      <Link href="/eventos" className="link-line text-[14px]"><ArrowLeft className="h-4 w-4" />Agenda</Link>

      <section className="mt-8 grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div>
          <p className="t-label mb-4">{[event.category, cleanText(event.organizer)].filter(Boolean).join(" · ")}</p>
          <h1 className="rise"><span className="t-thin block text-[clamp(40px,5.6vw,88px)] normal-case !leading-[0.95]">{title}</span></h1>

          <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-3">
            <div className="border-t hair pt-4">
              <dt className="t-label">Dia</dt>
              <dd className="mt-3">
                {date ? (
                  <>
                    <span className="flex items-baseline gap-2">
                      <span className="t-num text-[clamp(56px,6vw,88px)]">{date.getDate()}</span>
                      <span className="t-thin text-[24px]">{monthLong(date).slice(0, 3)}</span>
                    </span>
                    <span className="mt-2 block text-[14px] capitalize text-muted-foreground">{weekday(date)}, {date.getFullYear()}</span>
                  </>
                ) : <span className="text-[17px]">{event.date}</span>}
              </dd>
            </div>
            <div className="border-t hair pt-4">
              <dt className="t-label">Hora</dt>
              <dd className="mt-3">
                <span className="t-num text-[clamp(56px,6vw,88px)]">{event.time || "—"}</span>
                {event.endTime && <span className="mt-2 block text-[14px] text-muted-foreground">até às {event.endTime}</span>}
              </dd>
            </div>
            <div className="border-t hair pt-4">
              <dt className="t-label">Sítio</dt>
              <dd className="mt-4">
                <span className="block text-[19px] font-medium leading-snug text-[hsl(var(--ink))]">{cleanText(event.location)}</span>
                {event.address && <span className="mt-1 block text-[14px] text-muted-foreground">{cleanText(event.address)}</span>}
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {event.website && (
              <a href={event.website} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-full bg-[hsl(var(--ink))] px-7 text-[15px] font-medium text-[hsl(var(--background))] transition-colors duration-300 hover:bg-[hsl(var(--azul))] hover:text-white">
                Ver no site oficial <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            <QuickShareButton event={{ id: event.id, title, description: cleanText(event.description), date: event.date, time: event.time ?? "", location: cleanText(event.location), image: event.image ?? "", url: "" }} />
          </div>

          {event.description && (
            <div className="mt-14 border-t hair pt-4">
              <h2 className="t-label mb-4">Sobre o evento</h2>
              <p className="max-w-[62ch] whitespace-pre-line text-[17px] leading-[1.7] text-[hsl(var(--ink))]">{cleanText(event.description)}</p>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative mx-auto w-full max-w-[440px]">
            <img src={event.image || "/images/leiria-castle.jpg"} alt={`Cartaz de ${title}`} className="page-in w-full rounded-[22px] object-cover shadow-[0_40px_70px_-40px_hsl(var(--ink)/0.55)]" />
            <span className="brackets"><i /></span>
          </div>
        </div>
      </section>

      {more.length > 0 && (
        <section className="mt-20">
          <div className="mb-2 flex items-center justify-between border-t hair pt-4">
            <h2 className="t-label">A seguir na agenda</h2>
            <Link href="/eventos" className="link-line text-[14px]">Ver tudo <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <ul>
            {more.map((e) => {
              const d = parseEventDate(e.date)
              return (
                <li key={e.id} className="border-b hair">
                  <Link href={`/evento/${e.id}`} className="group flex items-center gap-5 py-4 transition-[padding] duration-300 ease-out hover:pl-3">
                    <span className="t-num w-[92px] shrink-0 text-[28px]">{d ? `${d.getDate()} ${monthLong(d).slice(0, 3)}` : "—"}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[17px] font-medium text-[hsl(var(--ink))]">{cleanText(e.title)}</span>
                      <span className="mt-0.5 block text-[13px] text-muted-foreground">{e.time ? `${e.time} · ` : ""}{cleanText(e.location)}</span>
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--azul))]" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      <section className="mt-20">
        <EventComments eventId={event.id} />
      </section>
    </main>
  )
}
