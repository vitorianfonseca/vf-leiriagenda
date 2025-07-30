"use client"

export function NewPaletteDemo() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Nova Paleta - Tons Neutros/Warm</h2>
      
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-palette-light-grey rounded-lg mb-2 border"></div>
          <p className="text-sm font-medium">Light Grey</p>
          <p className="text-xs text-gray-600">#C3A995</p>
        </div>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-palette-warm-beige rounded-lg mb-2 border"></div>
          <p className="text-sm font-medium">Warm Beige</p>
          <p className="text-xs text-gray-600">#AB947E</p>
        </div>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-palette-cream-light rounded-lg mb-2 border"></div>
          <p className="text-sm font-medium">Cream Light</p>
          <p className="text-xs text-gray-600">#F5EBE0</p>
        </div>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-palette-rose-warm rounded-lg mb-2 border"></div>
          <p className="text-sm font-medium">Rose Warm</p>
          <p className="text-xs text-gray-600">#AB947E</p>
        </div>
        
        <div className="text-center">
          <div className="w-20 h-20 bg-palette-warm-dark rounded-lg mb-2 border"></div>
          <p className="text-sm font-medium">Rose Grey</p>
          <p className="text-xs text-gray-600">#6F5E53</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Aplicação da Paleta:</h3>
        
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-palette-warm-dark text-white rounded-lg hover:bg-palette-warm-beige transition-colors">
            Botão Principal
          </button>
          
          <button className="px-4 py-2 border border-palette-warm-dark text-palette-warm-dark bg-transparent rounded-lg hover:bg-palette-warm-dark hover:text-white transition-colors">
            Botão Outline
          </button>
        </div>

        <div className="p-4 bg-palette-cream-light border border-palette-rose-warm rounded-lg">
          <p className="text-gray-800">Exemplo de card com fundo suave da nova paleta</p>
        </div>
      </div>
    </div>
  )
}
