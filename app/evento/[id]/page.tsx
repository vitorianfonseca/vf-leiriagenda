import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Clock, ArrowLeft, ExternalLink } from "lucide-react"
import { EventComments } from "@/components/event-comments"
import { QuickShareButton } from "@/components/social-sharing"
import eventsData from "@/data/events.json"

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = eventsData.events.find((e) => e.id === params.id) ?? eventsData.events[0]

  return (
    <div className="flex-1 bg-background">
      {/* Back Button */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/eventos" className="inline-flex items-center text-primary/60 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos eventos
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="relative mb-6">
              <Image
                src={event.image || "/images/leiria-castle.jpg"}
                alt={event.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
                unoptimized={event.image?.startsWith("http")}
              />
            </div>

            {/* Event Info */}
            <div className="bg-card rounded-lg p-6 mb-6">
              <div className="mb-4">
                <Badge variant="secondary" className="mb-2">{event.category}</Badge>
                <h1 className="text-3xl font-bold text-foreground mb-4">{event.title}</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-primary/60">
                  <Calendar className="h-5 w-5 mr-3 text-primary" />
                  <div className="font-medium">{event.date}</div>
                </div>
                {event.time && (
                  <div className="flex items-center text-primary/60">
                    <Clock className="h-5 w-5 mr-3 text-primary" />
                    <div className="font-medium">{event.time}{event.endTime ? ` - ${event.endTime}` : ""}</div>
                  </div>
                )}
                <div className="flex items-center text-primary/60">
                  <MapPin className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <div className="font-medium">{event.location}</div>
                    {event.address && <div className="text-sm">{event.address}</div>}
                  </div>
                </div>
              </div>

              {event.description && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Sobre o Evento</h2>
                  <div className="text-foreground/80 whitespace-pre-line leading-relaxed">{event.description}</div>
                </div>
              )}

              {event.organizer && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Organizador</h3>
                  <p className="text-foreground/80">{event.organizer}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="space-y-3 mb-6">
                  {event.website && (
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white text-base py-3">
                      <a href={event.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ver no site oficial
                      </a>
                    </Button>
                  )}
                  <QuickShareButton
                    title={event.title}
                    url={typeof window !== "undefined" ? window.location.href : ""}
                  />
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-3">Detalhes</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-primary/60">Data:</span>
                      <span className="font-medium text-right">{event.date}</span>
                    </div>
                    {event.time && (
                      <div className="flex justify-between">
                        <span className="text-primary/60">Hora:</span>
                        <span className="font-medium">{event.time}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-primary/60">Local:</span>
                      <span className="font-medium text-right">{event.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-primary/60">Categoria:</span>
                      <span className="font-medium">{event.category}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <EventComments eventId={params.id} />
      </div>
    </div>
  )
}
