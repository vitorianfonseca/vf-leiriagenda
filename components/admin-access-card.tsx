"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/contexts/toast-context"

export function AdminAccessCard() {
  const { addToast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    addToast("Copiado para a área de transferência!", "success")
  }

  return (
    <Card className="border-palette-earthy-brown bg-palette-cream-light/50">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-palette-earthy-brown" />
          <CardTitle className="text-palette-earthy-brown">Acesso de Administrador</CardTitle>
        </div>
        <CardDescription>
          Para testar o painel administrativo, use uma das contas de demonstração
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
            <div>
              <Badge className="mb-1 bg-palette-earthy-brown text-white">Conta Admin 1</Badge>
              <p className="text-sm font-mono">admin@leiria.pt</p>
              <p className="text-xs text-primary/50">Password: qualquer</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard("admin@leiria.pt")}
              className="text-palette-earthy-brown border-palette-earthy-brown"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
            <div>
              <Badge className="mb-1 bg-palette-earthy-brown text-white">Conta Admin 2</Badge>
              <p className="text-sm font-mono">admin@leiriagenda.com</p>
              <p className="text-xs text-primary/50">Password: qualquer</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard("admin@leiriagenda.com")}
              className="text-palette-earthy-brown border-palette-earthy-brown"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex space-x-2">
          <Link href="/login" className="flex-1">
            <Button className="w-full bg-palette-earthy-brown hover:bg-palette-rich-brown text-white">
              Ir para Login
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="outline" className="text-palette-earthy-brown border-palette-earthy-brown">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
