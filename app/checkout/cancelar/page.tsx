import Link from "next/link"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"

export default function CheckoutCancelarPage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-background min-h-[60vh]">
      <div className="text-center max-w-md px-6">
        <XCircle className="h-20 w-20 text-foreground/30 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-foreground mb-3">Pagamento cancelado</h1>
        <p className="text-foreground/60 mb-8">
          O pagamento foi cancelado. Podes tentar novamente quando quiseres.
        </p>
        <Button asChild className="bg-primary text-white hover:bg-primary/90">
          <Link href="/eventos">Ver eventos</Link>
        </Button>
      </div>
    </div>
  )
}
