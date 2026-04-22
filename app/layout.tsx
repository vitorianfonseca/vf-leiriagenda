import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, DM_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/hooks/use-theme"
import { I18nProvider } from "@/hooks/use-i18n"
import { AuthProvider } from "@/contexts/auth-context"
import { ToastProvider } from "@/contexts/toast-context"
import { NotificationProvider } from "@/contexts/notification-context"
import { DataInitializer } from "@/components/data-initializer"
import { ToastContainer } from "@/components/toast-container"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "LeiriAgenda - Eventos em Leiria",
  description: "Descubra os melhores eventos culturais, sociais e criativos em Leiria, Portugal",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={`${cormorant.variable} ${dmSans.variable} font-sans`}>
        <ThemeProvider>
          <I18nProvider>
            <ToastProvider>
              <AuthProvider>
                <NotificationProvider>
                  <DataInitializer />
                  <div className="min-h-screen flex flex-col">
                    <Header />
                    {children}
                    <Footer />
                  </div>
                  <ToastContainer />
                </NotificationProvider>
              </AuthProvider>
            </ToastProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
