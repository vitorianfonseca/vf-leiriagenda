import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/contexts/auth-context"
import { ToastProvider } from "@/contexts/toast-context"
import { ToastContainer } from "@/components/toast-container"
import { I18nProvider } from "@/hooks/use-i18n"
import { ThemeProvider } from "@/hooks/use-theme"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LeiriAgenda - Eventos em Leiria",
  description: "Descubra os melhores eventos culturais, sociais e criativos em Leiria, Portugal",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <I18nProvider>
            <AuthProvider>
              <ToastProvider>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <ToastContainer />
              </ToastProvider>
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
