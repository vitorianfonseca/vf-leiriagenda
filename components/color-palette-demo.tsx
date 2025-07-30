import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ColorPaletteDemo() {
  return (
    <div className="p-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-palette-earthy-brown">
          Nova Paleta de Cores LeiriAgenda
        </h1>
        <p className="text-lg text-palette-dark-brown">
          Usando tons terrosos e quentes para criar uma experiência visual acolhedora
        </p>
      </div>

      {/* Demonstração das cores */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-palette-cream-light border-palette-sand">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-palette-dark-brown">Cream</CardTitle>
            <CardDescription className="text-xs">#EDE0D4</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-palette-sand border-palette-warm-tan">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-palette-dark-brown">Sand</CardTitle>
            <CardDescription className="text-xs">#E6CCB2</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-palette-warm-tan border-palette-earthy-brown">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white">Warm Tan</CardTitle>
            <CardDescription className="text-xs text-white/80">#DDB892</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-palette-earthy-brown border-palette-rich-brown">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white">Earthy Brown</CardTitle>
            <CardDescription className="text-xs text-white/80">#6F5E53</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-palette-rich-brown border-palette-dark-brown">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white">Rich Brown</CardTitle>
            <CardDescription className="text-xs text-white/80">#C3A995</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="bg-palette-dark-brown border-palette-rich-brown">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-white">Dark Brown</CardTitle>
            <CardDescription className="text-xs text-white/80">#9C6644</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Componentes em ação */}
      <Card className="bg-palette-cream-light border-palette-sand">
        <CardHeader>
          <CardTitle className="text-palette-earthy-brown">
            Exemplo de Card com Nova Paleta
          </CardTitle>
          <CardDescription className="text-palette-dark-brown">
            Demonstrando como os componentes ficam com as novas cores
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-palette-earthy-brown text-white">Evento Principal</Badge>
            <Badge className="bg-palette-warm-tan text-palette-dark-brown">Categoria</Badge>
            <Badge className="bg-palette-sand text-palette-dark-brown">Grátis</Badge>
          </div>
          
          <div className="flex gap-2">
            <Button className="bg-palette-earthy-brown hover:bg-palette-rich-brown text-white">
              Botão Principal
            </Button>
            <Button 
              variant="outline" 
              className="border-palette-earthy-brown text-palette-earthy-brown hover:bg-palette-earthy-brown hover:text-white"
            >
              Botão Secundário
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
