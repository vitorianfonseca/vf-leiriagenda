import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const { eventId, eventTitle, priceInCents, quantity = 1 } = await req.json()

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "multibanco", "mb_way"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: { name: eventTitle },
          unit_amount: priceInCents,
        },
        quantity,
      },
    ],
    mode: "payment",
    success_url: `${baseUrl}/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}&event_id=${eventId}`,
    cancel_url: `${baseUrl}/evento/${eventId}`,
  })

  return NextResponse.json({ url: session.url })
}
