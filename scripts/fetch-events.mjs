import { writeFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_FILE = join(__dirname, "../data/events.json")

const BASE = "https://leiriagenda.cm-leiria.pt"
const LIST_URL = `${BASE}/pt/agenda/proximos-eventos`
const MAX_PAGES = 8
const MAX_EVENTS = 80
const DELAY_MS = 400

const HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; LeiriAgendaBot/1.0)",
  Accept: "text/html,application/xhtml+xml",
  "Accept-Language": "pt-PT,pt;q=0.9",
}

const MONTH_MAP = {
  "jan.": "janeiro", "fev.": "fevereiro", "mar.": "março",
  "abr.": "abril",   "mai.": "maio",      "jun.": "junho",
  "jul.": "julho",   "ago.": "agosto",    "set.": "setembro",
  "out.": "outubro", "nov.": "novembro",  "dez.": "dezembro",
}

const CATEGORY_MAP = {
  cinema: "Cinema", música: "Música", musica: "Música",
  teatro: "Teatro", dança: "Dança", danca: "Dança",
  desporto: "Desporto", exposição: "Exposição", exposicao: "Exposição",
  literatura: "Cultura", arte: "Artes", workshop: "Workshop",
  gastronomia: "Gastronomia", conferência: "Conferência",
}

function normalizeCategory(raw = "") {
  const l = raw.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
  for (const [k, v] of Object.entries(CATEGORY_MAP)) {
    const kn = k.normalize("NFD").replace(/[̀-ͯ]/g, "")
    if (l.includes(kn)) return v
  }
  return "Cultura"
}

function parseTime(raw = "") {
  const m = raw.match(/(\d{1,2})h(\d{2})/)
  return m ? `${m[1].padStart(2, "0")}:${m[2]}` : ""
}

function slugToId(url = "") {
  return url.replace(/.*\/agenda\//, "").replace(/[^a-z0-9-]/gi, "-").toLowerCase()
}

async function get(url) {
  const r = await fetch(url, { headers: HEADERS })
  return r.ok ? r.text() : null
}

function extractMeta(html, prop) {
  const m = html.match(new RegExp(`<meta[^>]+(?:property|name|itemprop)="${prop}"[^>]+content="([^"]*)"`, "i"))
    || html.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:property|name|itemprop)="${prop}"`, "i"))
  return m ? m[1].replace(/&amp;/g, "&").replace(/&apos;/g, "'").replace(/&#8230;/g, "…").trim() : ""
}

// Parseia os cards da listagem com base na estrutura real do site
function parseCards(html) {
  const cards = []
  // Cada evento: <a href="https://leiriagenda.cm-leiria.pt/pt/agenda/SLUG">
  const re = /<a\s+href="(https:\/\/leiriagenda\.cm-leiria\.pt\/pt\/agenda\/[^"]+)">([\s\S]*?)<\/a>/gi
  let m

  while ((m = re.exec(html)) !== null) {
    const url = m[1]
    const inner = m[2]

    // Filtrar links que não são eventos (navegação, etc.)
    if (url.includes("/pt/agenda/proximos") || url.includes("/pt/agenda/passados") ||
        url.includes("/pt/agenda/a-decorrer") || inner.length < 50) continue

    // Imagem do card (background-image)
    const imgM = inner.match(/background-image:\s*url\(([^)]+)\)/)
    const image = imgM ? imgM[1].trim() : ""

    // Data: <span class="dia">, <span class="mes">, <span class="ano">
    const dia = (inner.match(/class="dia">(\d+)/) || [])[1] || ""
    const mes = (inner.match(/class="mes">([^<]+)/) || [])[1]?.trim() || ""
    const ano = (inner.match(/class="ano">(\d{4})/) || [])[1] || ""
    const timeRaw = (inner.match(/class="ano">(\d{1,2}h\d{2})/) || [])[1] || ""

    const mesNome = MONTH_MAP[mes] || mes
    const date = dia && mesNome && ano ? `${dia} de ${mesNome} de ${ano}` : ""

    // Título: <span class="proximo_title">
    const titleM = inner.match(/class="proximo_title">([^<]+)/)
    const title = titleM ? titleM[1].trim() : ""
    if (!title) continue

    // Local
    const localM = inner.match(/class="local">([^<]+)/)
    const localidadeM = inner.match(/class="localidade">([^<]+)/)
    const location = localM ? localM[1].trim() : "Leiria"
    const city = localidadeM ? localidadeM[1].trim() : "Leiria"

    // Categorias
    const cats = [...inner.matchAll(/<small>([^<]+)<\/small>/gi)].map(x => x[1].trim())
    const category = normalizeCategory(cats[0] || "")

    cards.push({ url, image, date, time: parseTime(timeRaw), location, city, category, title })
  }

  // Deduplicar por URL
  const seen = new Set()
  return cards.filter(c => { if (seen.has(c.url)) return false; seen.add(c.url); return true })
}

async function fetchDetail(url) {
  const html = await get(url)
  if (!html) return {}

  // Imagem full (og:image)
  const image = extractMeta(html, "og:image")

  // Descrição (og:description ou itemprop)
  let desc = extractMeta(html, "og:description") || extractMeta(html, "description")
  // Tenta apanhar o parágrafo completo do body
  const pM = html.match(/<p>([^<]{40,})<\/p>/)
  if (pM) {
    const longer = pM[1].replace(/&[a-z]+;/g, " ").trim()
    if (longer.length > desc.length) desc = longer
  }

  // Preço / bilheteira
  const isFree = !html.includes("link_bilheteira") && !html.includes("Comprar bilhete")
  const ticketM = html.match(/class="link_bilheteira"[\s\S]*?href="([^"]+)"/)
  const ticketUrl = ticketM ? ticketM[1] : ""

  // Morada
  const addrM = html.match(/class="local-inner"[\s\S]*?class="local">([^<]+)/)
  const address = addrM ? addrM[1].trim() : ""

  // Organizador
  const orgM = html.match(/class="agente-nome"[^>]*>([^<]+)/)
  const organizer = orgM ? orgM[1].trim() : "Câmara Municipal de Leiria"

  return { image, description: desc, isFree, ticketUrl, address, organizer }
}

async function main() {
  console.log("A recolher eventos de leiriagenda.cm-leiria.pt...")

  const allCards = []
  for (let page = 1; page <= MAX_PAGES; page++) {
    const url = page === 1 ? LIST_URL : `${LIST_URL}?page=${page}`
    console.log(`  Página ${page}...`)
    const html = await get(url)
    if (!html) break
    const cards = parseCards(html)
    if (cards.length === 0) { console.log("    Sem mais eventos."); break }
    console.log(`    ${cards.length} eventos`)
    allCards.push(...cards)
    if (allCards.length >= MAX_EVENTS) break
    await new Promise(r => setTimeout(r, DELAY_MS))
  }

  const limited = allCards.slice(0, MAX_EVENTS)
  console.log(`\nTotal: ${limited.length} eventos. A carregar detalhes...`)

  const events = []
  for (const card of limited) {
    await new Promise(r => setTimeout(r, DELAY_MS))
    const detail = await fetchDetail(card.url)

    events.push({
      id: slugToId(card.url),
      title: card.title,
      description: detail.description || `${card.title} — evento em ${card.city}.`,
      date: card.date,
      time: card.time,
      endTime: "",
      location: card.location,
      address: detail.address || `${card.location}, ${card.city}`,
      category: card.category,
      price: detail.isFree ? "Gratuito" : "Ver site",
      isFree: detail.isFree,
      capacity: null,
      organizer: detail.organizer || "Câmara Municipal de Leiria",
      email: "",
      phone: "",
      website: card.url,
      image: detail.image || card.image || "/placeholder.svg?height=400&width=800",
      status: "approved",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorites: 0,
      views: 0,
      source: "leiriagenda-cml",
    })
    process.stdout.write(".")
  }

  console.log(`\n\n✓ ${events.length} eventos guardados.`)
  writeFileSync(
    OUT_FILE,
    JSON.stringify({ fetchedAt: new Date().toISOString(), total: events.length, events }, null, 2),
    "utf-8"
  )
}

main().catch(err => { console.error(err); process.exit(1) })
