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

    console.log('Setting up mouse listeners...')

    let mouseMoveTimeout: NodeJS.Timeout

    const handleMouseMove = (event: MouseEvent) => {
      console.log('Mouse move detected:', event.clientX, event.clientY)
      setMousePosition({ x: event.clientX, y: event.clientY })
      setIsMouseMoving(true)
      
      clearTimeout(mouseMoveTimeout)
      mouseMoveTimeout = setTimeout(() => {
        setIsMouseMoving(false)
      }, 100)
    }

    window.addEventListener('mousemove', handleMouseMove)
    console.log('Mouse listeners added')

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(mouseMoveTimeout)
      console.log('Mouse listeners removed')
    }
  }, [mounted])

  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90"></div>
    )
  }

  console.log('Rendering with mouse position:', mousePosition, 'Moving:', isMouseMoving)

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base Gradient Background - fundo mais claro com 90% transparência */}
      <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90"></div>
      
      {/* Interactive Cursor Light */}
      <div 
        className="absolute pointer-events-none z-10 rounded-full transition-all duration-100 ease-out opacity-70"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
          width: isMouseMoving ? '300px' : '200px',
          height: isMouseMoving ? '300px' : '200px',
          background: isMouseMoving 
            ? 'radial-gradient(circle, rgba(96, 70, 82, 0.4) 0%, rgba(115, 85, 87, 0.3) 30%, rgba(151, 134, 106, 0.2) 60%, transparent 100%)'
            : 'radial-gradient(circle, rgba(96, 70, 82, 0.2) 0%, rgba(115, 85, 87, 0.15) 30%, rgba(151, 134, 106, 0.1) 60%, transparent 100%)',
        }}
      />
      
      {/* Simple ripple effect when moving */}
      {isMouseMoving && (
        <div 
          className="absolute pointer-events-none z-5 rounded-full border-2 opacity-60"
          style={{
            left: mousePosition.x - 25,
            top: mousePosition.y - 25,
            width: '50px',
            height: '50px',
            borderColor: 'rgba(96, 70, 82, 0.6)',
            animation: 'ping 0.6s cubic-bezier(0, 0, 0.2, 1) 1',
          }}
        />
      )}
      
      {/* Manter fundo sempre branco limpo */}
    </div>
  )
}
