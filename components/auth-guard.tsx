"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useI18n } from "@/hooks/use-i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock, User } from "lucide-react"
import Link from "next/link"

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  message?: string
}

export function AuthGuard({ children, fallback, message }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const { t } = useI18n()

  if (isLoading) {
    return (
      <div className="flex-1 bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary/50 font-sans text-sm">{t("common.loading")}</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="flex-1 bg-background flex items-center justify-center p-4">
          <Card className="w-full max-w-sm mx-auto border border-border shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="w-14 h-14 bg-primary/8 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-6 w-6 text-primary/60" />
              </div>
              <CardTitle className="font-display font-light text-2xl text-foreground">{t("auth.loginRequired")}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4 pt-2">
              <p className="text-sm text-primary/60 font-sans leading-relaxed">{message || t("auth.loginMessage")}</p>
              <div className="space-y-2 pt-2">
                <Link href="/login" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white font-sans text-sm tracking-wide transition-all duration-300">
                    <User className="h-4 w-4 mr-2" />
                    {t("auth.login")}
                  </Button>
                </Link>
                <Link href="/registo" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-primary/30 text-primary hover:bg-primary hover:text-white font-sans text-sm tracking-wide transition-all duration-300"
                  >
                    {t("auth.createAccount")}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    )
  }

  return <>{children}</>
}
