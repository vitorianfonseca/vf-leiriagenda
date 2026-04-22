"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch?: (query: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({ onSearch, placeholder = "Procurar...", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/40 h-5 w-5" />
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="pl-12 pr-4 py-3 text-lg border-2 border-white/30 focus:border-primary rounded-full bg-white/90 backdrop-blur-sm text-foreground placeholder:text-primary/60"
      />
      <Button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-accent text-white rounded-full px-6 transition-all duration-300"
      >
        Procurar
      </Button>
    </form>
  )
}
