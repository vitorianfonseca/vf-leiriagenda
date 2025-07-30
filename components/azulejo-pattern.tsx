"use client"

import { useState, useEffect } from 'react'

interface AzulejoPatternProps {
  className?: string
  variant?: 'subtle' | 'prominent' | 'decorative'
}

export function AzulejoPattern({ className = '', variant = 'subtle' }: AzulejoPatternProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const getOpacity = () => {
    switch (variant) {
      case 'prominent': return 'opacity-10'
      case 'decorative': return 'opacity-15'
      default: return 'opacity-5'
    }
  }

  const getSize = () => {
    switch (variant) {
      case 'prominent': return '60px'
      case 'decorative': return '80px'
      default: return '40px'
    }
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${getOpacity()} ${className}`}>
      {/* Padrão principal de azulejos */}
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #2B3A67 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #517BD2 1.5px, transparent 1.5px),
            linear-gradient(45deg, transparent 40%, rgba(200, 169, 106, 0.3) 50%, transparent 60%),
            linear-gradient(-45deg, transparent 40%, rgba(200, 169, 106, 0.2) 50%, transparent 60%)
          `,
          backgroundSize: `${getSize()} ${getSize()}`,
          backgroundPosition: '0 0, 30px 30px, 0 0, 0 0'
        }}
      />
      
      {/* Padrão secundário com elementos dourados */}
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px',
          backgroundPosition: '60px 60px'
        }}
      />

      {/* Elementos decorativos geométricos */}
      {variant === 'decorative' && (
        <>
          <div className="absolute top-1/4 left-1/4 w-16 h-16 transform rotate-45">
            <div className="w-full h-full border-2 border-azulejo-blue/30 bg-gradient-to-br from-white/50 to-azulejo-blue/10">
              <div className="w-full h-full border border-gold/40 m-1 bg-gradient-to-tr from-gold/10 to-transparent"></div>
            </div>
          </div>
          
          <div className="absolute top-3/4 right-1/3 w-12 h-12 transform -rotate-12">
            <div className="w-full h-full border-2 border-gold/40 bg-gradient-to-bl from-azulejo-blue/20 to-white/30 rounded-sm">
              <div className="w-2 h-2 bg-gold-bright rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>

          <div className="absolute bottom-1/4 left-2/3 w-10 h-10 transform rotate-12">
            <div className="w-full h-full bg-gradient-to-r from-azulejo-blue/15 to-gold/15 border border-azulejo-dark/20">
              <div className="w-1 h-1 bg-gold-bright absolute top-2 left-2"></div>
              <div className="w-1 h-1 bg-gold-bright absolute bottom-2 right-2"></div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
