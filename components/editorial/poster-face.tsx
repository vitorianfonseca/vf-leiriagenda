"use client"

import { cleanText, monthShort, parseEventDate, type AgendaEvent } from "@/lib/agenda"

/** A face de um cartão do baralho: o cartaz do evento, com o dia por cima. */
export function PosterFace({ event }: { event: AgendaEvent }) {
  const date = parseEventDate(event.date)
  return (
    <span className="relative block h-full w-full overflow-hidden rounded-[22px] bg-[hsl(var(--ink))] shadow-[0_30px_60px_-34px_hsl(var(--ink)/0.6)]">
      <img
        src={event.image || "/images/leiria-castle.jpg"}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
        // Cartazes que a origem já apagou caem para a fotografia do castelo.
        onError={(e) => { if (!e.currentTarget.src.endsWith("/images/leiria-castle.jpg")) e.currentTarget.src = "/images/leiria-castle.jpg" }}
      />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-5 pt-16">
        {date && (
          <span className="flex items-baseline gap-2 text-white">
            <span className="font-display text-[44px] font-light leading-none">{date.getDate()}</span>
            <span className="font-display text-[20px] font-extralight uppercase">{monthShort(date)}</span>
          </span>
        )}
        <span className="mt-2 block text-[15px] font-medium leading-snug text-white [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">{cleanText(event.title)}</span>
      </span>
    </span>
  )
}
