"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "dark" | "light" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: "dark" | "light"
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system")
  const [actualTheme, setActualTheme] = useState<"dark" | "light">("light")

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("leiria-agenda-theme") as Theme
    if (savedTheme && ["dark", "light", "system"].includes(savedTheme)) {
      setThemeState(savedTheme)
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement

    const applyTheme = (newTheme: "dark" | "light") => {
      root.classList.remove("light", "dark")
      root.classList.add(newTheme)
      setActualTheme(newTheme)
    }

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      applyTheme(systemTheme)

      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
      const handleChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? "dark" : "light")
      }

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    } else {
      applyTheme(theme)
    }
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("leiria-agenda-theme", newTheme)
  }

  return <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
