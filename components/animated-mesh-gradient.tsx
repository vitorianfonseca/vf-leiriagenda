"use client"

import { useState, useEffect } from 'react'

export function AnimatedMeshGradient() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMouseMoving, setIsMouseMoving] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return

    let mouseMoveTimeout: NodeJS.Timeout

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
      setIsMouseMoving(true)
      
      clearTimeout(mouseMoveTimeout)
      mouseMoveTimeout = setTimeout(() => {
        setIsMouseMoving(false)
      }, 150)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(mouseMoveTimeout)
    }
  }, [mounted])

  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-white"></div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base Background - Mantém o fundo branco original */}
      <div className="absolute inset-0 bg-white"></div>
      
      {/* Cursor interativo com novo verde como principal */}
      <div 
        className="absolute pointer-events-none z-10 rounded-full transition-all duration-200 ease-out"
        style={{
          left: mousePosition.x - 120,
          top: mousePosition.y - 120,
          width: isMouseMoving ? '350px' : '240px',
          height: isMouseMoving ? '350px' : '240px',
          background: isMouseMoving
            ? 'radial-gradient(circle, rgba(58, 27, 6, 0.10) 0%, rgba(35, 16, 8, 0.06) 30%, rgba(107, 62, 30, 0.04) 60%, transparent 100%)'
            : 'radial-gradient(circle, rgba(58, 27, 6, 0.05) 0%, rgba(35, 16, 8, 0.03) 30%, rgba(107, 62, 30, 0.01) 60%, transparent 100%)',
          opacity: 0.7
        }}
      />
      
      {/* Ripple effects com cores beige quando há movimento */}
      {isMouseMoving && (
        <>
          <div 
            className="absolute pointer-events-none z-5 rounded-full border-2 opacity-60"
            style={{
              left: mousePosition.x - 30,
              top: mousePosition.y - 30,
              width: '60px',
              height: '60px',
              borderColor: 'rgba(214, 193, 166, 0.8)',
              animation: 'ping 0.8s cubic-bezier(0, 0, 0.2, 1) 1',
              boxShadow: '0 0 15px rgba(214, 193, 166, 0.3)'
            }}
          />
          <div 
            className="absolute pointer-events-none z-4 rounded-full border opacity-40"
            style={{
              left: mousePosition.x - 15,
              top: mousePosition.y - 15,
              width: '30px',
              height: '30px',
              borderColor: 'rgba(232, 220, 198, 0.9)',
              animation: 'ping 0.6s cubic-bezier(0, 0, 0.2, 1) 1',
              boxShadow: '0 0 10px rgba(232, 220, 198, 0.4)'
            }}
          />
        </>
      )}
      
      {/* Detalhes beige flutuantes - mais quantidade e variedade */}
      <div className="absolute top-10 right-10 w-3 h-3 bg-beige-dark rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-16 left-16 w-2 h-2 bg-beige rounded-full opacity-40 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-32 left-20 w-1 h-1 bg-accent rounded-full opacity-50 animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-32 right-32 w-2 h-2 bg-beige-dark rounded-full opacity-35 animate-pulse" style={{animationDelay: '1.5s'}}></div>
      
      {/* Detalhes beige adicionais */}
      <div className="absolute top-20 left-10 w-1.5 h-1.5 bg-beige rounded-full opacity-25 animate-pulse" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute top-60 right-20 w-2.5 h-2.5 bg-accent rounded-full opacity-30 animate-pulse" style={{animationDelay: '2.5s'}}></div>
      <div className="absolute bottom-20 left-32 w-1 h-1 bg-beige-dark rounded-full opacity-45 animate-pulse" style={{animationDelay: '3s'}}></div>
      <div className="absolute top-40 right-40 w-1.5 h-1.5 bg-beige rounded-full opacity-35 animate-pulse" style={{animationDelay: '1.8s'}}></div>
      <div className="absolute bottom-40 right-16 w-2 h-2 bg-accent rounded-full opacity-25 animate-pulse" style={{animationDelay: '0.8s'}}></div>
      
      {/* Detalhes beige em cantos */}
      <div className="absolute top-6 left-6 w-1 h-1 bg-beige rounded-full opacity-40 animate-pulse" style={{animationDelay: '4s'}}></div>
      <div className="absolute top-6 right-6 w-1 h-1 bg-accent rounded-full opacity-35 animate-pulse" style={{animationDelay: '3.5s'}}></div>
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-beige-dark rounded-full opacity-30 animate-pulse" style={{animationDelay: '2.2s'}}></div>
      <div className="absolute bottom-6 right-6 w-1 h-1 bg-beige rounded-full opacity-45 animate-pulse" style={{animationDelay: '1.2s'}}></div>
      
      {/* Linhas beige sutis */}
      <div className="absolute top-16 left-24 w-8 h-px bg-gradient-to-r from-transparent via-beige-dark/20 to-transparent opacity-40"></div>
      <div className="absolute bottom-24 right-28 w-12 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent opacity-30"></div>
      <div className="absolute top-44 right-12 w-6 h-px bg-gradient-to-r from-transparent via-beige/30 to-transparent opacity-35" style={{transform: 'rotate(45deg)'}}></div>
    </div>
  )
}