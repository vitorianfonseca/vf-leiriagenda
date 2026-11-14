"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Heart } from "lucide-react"

import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/contexts/toast-context"
import { cleanText, groupByDay, monthShort, relativeDay, type AgendaEvent } from "@/lib/agenda"
import { cn } from "@/lib/utils"

function FavoriteButton({ id, title }: { id: string; title: string }) {
  const { isAuthenticated, isFavorite, addToFavorites, removeFromFavorites } = useAuth()
  const { addToast } = useToast()
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (isAuthenticated) setOn(isFavorite(id))
  }, [isAuthenticated, id, isFavorite])

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={on ? `Tirar ${title} dos favoritos` : `Guardar ${title} nos favoritos`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!isAuthenticated) return addToast("Entra na tua conta para guardar favoritos", "info")
        if (on) {
          removeFromFavorites(id)
          addToast("Tirado dos favoritos", "success")
        } else {
          addToFavorites(id)
          addToast("Guardado nos favoritos", "success")
        }
        setOn(!on)
      }}
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110",
        on ? "border-[hsl(var(--azul))] bg-azul text-white" : "border-[hsl(var(--ink)/0.25)] text-[hsl(var(--ink)/0.55)] hover:border-[hsl(var(--azul))] hover:text-[hsl(var(--azul))]",
      )}
    >
      <Heart className="h-4 w-4" fill={on ? "currentColor" : "none"} />
    </button>
  )
}

/**
 * A agenda como lista: cada dia abre com o numeral grande, e os eventos seguem
 * por hora. Ao passar o rato numa linha, o cartaz do evento aparece junto ao cursor.
 */
export function AgendaList({ events, limitDays }: { events: AgendaEvent[]; limitDays?: number }) {
  const groups = groupByDay(events).slice(0, limitDays)
  const preview = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<string | null>(null)

  // O cartaz segue o rato com um ligeiro atraso; só transformações, para não pesar.
  useEffect(() => {
    const el = preview.current
    if (!el || !window.matchMedia("(pointer: fine)").matches) return
    let x = 0, y = 0, tx = 0, ty = 0, frame = 0, running = false
    const step = () => {
      x += (tx - x) * 0.14
      y += (ty - y) * 0.14
      el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${((tx - x) * 0.04).toFixed(2)}deg)`
      if (Math.abs(tx - x) + Math.abs(ty - y) > 0.4) frame = requestAnimationFrame(step)
      else running = false
    }
    const onMove = (e: PointerEvent) => {
      tx = e.clientX + 28
      ty = e.clientY - 150
      if (!running) { running = true; frame = requestAnimationFrame(step) }
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(frame) }
  }, [])

  return (
    <div>
      {groups.map((group) => (
        <section key={group.key} className="grid gap-x-10 border-t hair py-8 md:grid-cols-[190px_minmax(0,1fr)]">
          <header className="mb-4 flex items-baseline gap-3 md:sticky md:top-24 md:mb-0 md:block md:self-start">
            <p className="t-num text-[clamp(64px,7vw,104px)]">{group.date.getDate()}</p>
            <p className="md:mt-2">
              <span className="t-thin text-[26px]">{monthShort(group.date)}</span>
              <span className="t-label ml-2 inline-block first-letter:uppercase md:ml-0 md:block md:pt-1">{relativeDay(group.date)}</span>
            </p>
          </header>

          <ul>
            {group.events.map((event, i) => (
              <li key={event.id} className={cn(i > 0 && "border-t hair")}>
                <Link
                  href={`/evento/${event.id}`}
                  onPointerEnter={() => setHover(event.image || null)}
                  onPointerLeave={() => setHover(null)}
                  className="group flex items-center gap-4 py-4 transition-[padding] duration-300 ease-out hover:pl-3 sm:gap-6"
                >
                  <span className="t-num w-[68px] shrink-0 text-[26px] sm:w-[84px] sm:text-[30px]">{event.time || "—"}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[17px] font-medium leading-snug text-[hsl(var(--ink))] sm:text-[19px]">{cleanText(event.title)}</span>
                    <span className="mt-1 block text-[13px] text-muted-foreground">
                      {cleanText(event.location)}{event.category ? ` · ${event.category}` : ""}
                    </span>
                  </span>
                  <FavoriteButton id={event.id} title={cleanText(event.title)} />
                  <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--azul))] sm:block" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div ref={preview} aria-hidden className="pointer-events-none fixed left-0 top-0 z-40 hidden will-change-transform md:block">
        <div className={cn("h-[300px] w-[230px] overflow-hidden rounded-[22px] bg-[hsl(var(--ink)/0.06)] shadow-[0_30px_60px_-30px_hsl(var(--ink)/0.5)] transition-[opacity,scale] duration-300", hover ? "scale-100 opacity-100" : "scale-90 opacity-0")}>
          {hover && <img src={hover} alt="" className="h-full w-full object-cover" />}
        </div>
      </div>
    </div>
  )
}
