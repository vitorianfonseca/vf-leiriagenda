import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function CheckoutSucessoPage({
  searchParams,
}: {
  searchParams: { event_id?: string }
}) {
  return (
    <div className="flex-1 flex items-center justify-center bg-background min-h-[60vh]">
      <div className="text-center max-w-md px-6">
        <CheckCircle className="h-20 w-20 text-primary mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-foreground mb-3">Pagamento confirmado!</h1>
        <p className="text-foreground/60 mb-8">
          O teu bilhete foi emitido com sucesso. Receberás uma confirmação por email em breve.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {searchParams.event_id && (
            <Button asChild variant="outline" className="border-primary text-primary">
              <Link href={`/evento/${searchParams.event_id}`}>Ver evento</Link>
            </Button>
          )}
          <Button asChild className="bg-primary text-white hover:bg-primary/90">
            <Link href="/meus-eventos">Os meus bilhetes</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
