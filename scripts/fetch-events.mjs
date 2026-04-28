import { writeFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_FILE = join(__dirname, "../data/events.json")

const EVENTBRITE_TOKEN = process.env.EVENTBRITE_TOKEN
const CATEGORIES = {
  "103": "Música",
  "105": "Artes",
  "113": "Cultura",
  "108": "Desporto",
  "102": "Workshop",
  "110": "Gastronomia",
  "101": "Teatro",
  "107": "Cinema",
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function formatDate(isoString) {
  const d = new Date(isoString)
  return d.toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" })
}

function formatTime(isoString) {
  const d = new Date(isoString)
  return d.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })
}

async function fetchEventbrite() {
  if (!EVENTBRITE_TOKEN) {
    console.warn("EVENTBRITE_TOKEN não definido — a saltar Eventbrite")
    return []
  }

  const params = new URLSearchParams({
    "location.address": "Leiria, Portugal",
    "location.within": "30km",
    "start_date.range_start": new Date().toISOString().split(".")[0] + "Z",
    "start_date.range_end": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split(".")[0] + "Z",
    expand: "venue,ticket_classes,organizer,category",
    page_size: "50",
  })

  const res = await fetch(`https://www.eventbriteapi.com/v3/events/search/?${params}`, {
    headers: { Authorization: `Bearer ${EVENTBRITE_TOKEN}` },
  })

  if (!res.ok) {
    console.error("Erro Eventbrite:", res.status, await res.text())
    return []
  }

  const data = await res.json()

  return (data.events || []).map((ev) => {
    const isFree = ev.is_free || false
    const ticket = ev.ticket_classes?.[0]
    const price = isFree ? "Gratuito" : ticket?.cost?.display || "Ver site"
    const category = CATEGORIES[ev.category?.id] || "Cultura"

    return {
      id: slugify(ev.name?.text || ev.id) + "-" + ev.id,
      title: ev.name?.text || "Sem título",
      description: ev.description?.text || ev.summary || "",
      date: formatDate(ev.start?.local),
      time: formatTime(ev.start?.local),
      endTime: formatTime(ev.end?.local),
      location: ev.venue?.name || "Leiria",
      address: [ev.venue?.address?.address_1, ev.venue?.address?.city].filter(Boolean).join(", ") || "Leiria",
      category,
      price,
      isFree,
      capacity: ev.capacity || null,
      organizer: ev.organizer?.name || "Organização",
      email: "",
      phone: "",
      website: ev.url || "",
      image: ev.logo?.url || "/placeholder.svg?height=400&width=800",
      status: "approved",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorites: 0,
      views: 0,
      source: "eventbrite",
    }
  })
}

async function main() {
  console.log("A ir buscar eventos de Leiria...")

  const events = await fetchEventbrite()

  console.log(`${events.length} eventos encontrados`)

  const output = {
    fetchedAt: new Date().toISOString(),
    total: events.length,
    events,
  }

  writeFileSync(OUT_FILE, JSON.stringify(output, null, 2), "utf-8")
  console.log(`Guardado em ${OUT_FILE}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
