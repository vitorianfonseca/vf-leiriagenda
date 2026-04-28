"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Ticket } from "lucide-react"

interface BuyTicketButtonProps {
  eventId: string
  eventTitle: string
  price: string
  isFree: boolean
}

function parsePriceInCents(price: string): number {
  const num = parseFloat(price.replace(/[^0-9.,]/g, "").replace(",", "."))
  return Math.round(num * 100)
}

export function BuyTicketButton({ eventId, eventTitle, price, isFree }: BuyTicketButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleBuy() {
    if (isFree) {
      // Para eventos gratuitos só confirmamos reserva
      alert("Lugar reservado com sucesso!")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId,
          eventTitle,
          priceInCents: parsePriceInCents(price),
          quantity: 1,
        }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      alert("Erro ao processar pagamento. Tenta novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleBuy}
      disabled={loading}
      className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-3"
    >
      <Ticket className="h-5 w-5 mr-2" />
      {loading ? "A processar..." : isFree ? "Reservar Lugar" : "Comprar Bilhete"}
    </Button>
  )
}
