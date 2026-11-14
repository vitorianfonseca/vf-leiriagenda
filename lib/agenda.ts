// Datas e textos dos eventos. As datas chegam escritas por extenso
// ("14 de novembro de 2026") e `new Date()` não as entende.

const MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
const MONTHS_SHORT = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
const WEEKDAYS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"]

export interface AgendaEvent {
  id: string
  title: string
  description?: string
  date: string
  time?: string
  endTime?: string
  location: string
  address?: string
  category: string
  image?: string
  website?: string
  organizer?: string
}

/** Lê "14 de novembro de 2026", "2026-11-14" ou "14/11/2026". Devolve `null` se não conseguir. */
export function parseEventDate(text: string | undefined | null): Date | null {
  if (!text) return null
  const long = text.trim().toLowerCase().match(/^(\d{1,2})\s+de\s+([a-zç]+)\s+de\s+(\d{4})/)
  if (long) {
    const month = MONTHS.indexOf(long[2])
    if (month >= 0) return new Date(Number(long[3]), month, Number(long[1]))
  }
  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (iso) return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]))
  const slash = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/)
  if (slash) return new Date(Number(slash[3]), Number(slash[2]) - 1, Number(slash[1]))
  return null
}

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const dayDiff = (a: Date, b: Date) => Math.round((startOfDay(a).getTime() - startOfDay(b).getTime()) / 86_400_000)

export const dayKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
export const monthShort = (d: Date) => MONTHS_SHORT[d.getMonth()]
export const monthLong = (d: Date) => MONTHS[d.getMonth()]
export const weekday = (d: Date) => WEEKDAYS[d.getDay()]

/** "hoje", "amanhã" ou o dia da semana, para datas próximas; senão o dia da semana. */
export function relativeDay(d: Date, now = new Date()): string {
  const diff = dayDiff(d, now)
  if (diff === 0) return "hoje"
  if (diff === 1) return "amanhã"
  return weekday(d)
}

export type When = "todos" | "hoje" | "fim-de-semana" | "semana" | "mes"

/** Diz se uma data cai no intervalo escolhido, contado a partir de hoje. */
export function matchesWhen(d: Date | null, when: When, now = new Date()): boolean {
  if (when === "todos") return true
  if (!d) return false
  const diff = dayDiff(d, now)
  if (diff < 0) return false
  if (when === "hoje") return diff === 0
  if (when === "semana") return diff <= 6
  if (when === "mes") return diff <= 30
  // Fim de semana: o próximo sábado e domingo (ou hoje, se já for fim de semana).
  const dow = now.getDay()
  const toSaturday = dow === 0 ? -1 : 6 - dow
  return diff === Math.max(toSaturday, 0) || diff === toSaturday + 1
}

/** Os títulos vêm com entidades HTML por converter ("Livros &amp; C.ª"). */
export function cleanText(text: string | undefined | null): string {
  return (text ?? "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
}

export interface DayGroup<T> {
  key: string
  date: Date
  events: T[]
}

/** Ordena por data e hora e agrupa por dia. Eventos sem data legível ficam de fora. */
export function groupByDay<T extends { date: string; time?: string }>(events: T[]): DayGroup<T>[] {
  const groups = new Map<string, DayGroup<T>>()
  for (const event of events) {
    const date = parseEventDate(event.date)
    if (!date) continue
    const key = dayKey(date)
    if (!groups.has(key)) groups.set(key, { key, date, events: [] })
    groups.get(key)!.events.push(event)
  }
  return [...groups.values()]
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((g) => ({ ...g, events: g.events.sort((a, b) => (a.time || "99").localeCompare(b.time || "99")) }))
}

/** Só eventos de hoje em diante. */
export function upcoming<T extends { date: string }>(events: T[], now = new Date()): T[] {
  return events.filter((e) => {
    const d = parseEventDate(e.date)
    return d ? dayDiff(d, now) >= 0 : false
  })
}
