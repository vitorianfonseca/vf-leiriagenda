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
      
      {/* Cursor interativo com as novas cores verde/dourado */}
      <div 
        className="absolute pointer-events-none z-10 rounded-full transition-all duration-200 ease-out"
        style={{
          left: mousePosition.x - 120,
          top: mousePosition.y - 120,
          width: isMouseMoving ? '350px' : '240px',
          height: isMouseMoving ? '350px' : '240px',
          background: isMouseMoving 
            ? 'radial-gradient(circle, rgba(119, 175, 135, 0.12) 0%, rgba(93, 142, 106, 0.08) 30%, rgba(212, 175, 55, 0.05) 60%, transparent 100%)'
            : 'radial-gradient(circle, rgba(119, 175, 135, 0.06) 0%, rgba(93, 142, 106, 0.04) 30%, rgba(212, 175, 55, 0.02) 60%, transparent 100%)',
          opacity: 0.7
        }}
      />
      
      {/* Ripple effects com cores douradas quando há movimento */}
      {isMouseMoving && (
        <>
          <div 
            className="absolute pointer-events-none z-5 rounded-full border-2 opacity-60"
            style={{
              left: mousePosition.x - 30,
              top: mousePosition.y - 30,
              width: '60px',
              height: '60px',
              borderColor: 'rgba(212, 175, 55, 0.5)',
              animation: 'ping 0.8s cubic-bezier(0, 0, 0.2, 1) 1',
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)'
            }}
          />
          <div 
            className="absolute pointer-events-none z-4 rounded-full border opacity-40"
            style={{
              left: mousePosition.x - 15,
              top: mousePosition.y - 15,
              width: '30px',
              height: '30px',
              borderColor: 'rgba(255, 215, 0, 0.6)',
              animation: 'ping 0.6s cubic-bezier(0, 0, 0.2, 1) 1',
              boxShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
            }}
          />
        </>
      )}
    </div>
  )
}