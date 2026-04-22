"use client"

import { useState, useEffect } from 'react'

interface CircularGradientBgProps {
  className?: string
  size?: 'small' | 'medium' | 'large'
}

export function CircularGradientBg({ className = '', size = 'medium' }: CircularGradientBgProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64'
  }

  return (
    <div className={`absolute ${sizeClasses[size]} ${className}`}>
      {/* Gradiente circular principal */}
      <div 
        className="w-full h-full rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #4e8950 0%, #29482a 50%, transparent 100%)'
        }}
      />
      
      {/* Overlay com gradiente mais suave */}
      <div 
        className="absolute inset-0 w-full h-full rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #9fb97f 0%, #4e8950 40%, transparent 80%)'
        }}
      />
      
      {/* Brilho interno dourado */}
      <div 
        className="absolute inset-4 w-auto h-auto rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, transparent 60%)'
        }}
      />
    </div>
  )
}
