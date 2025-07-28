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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-gray-500 dark:text-gray-400">{t("common.loading")}</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <Card className="w-full max-w-md mx-auto dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-gray-400" />
              </div>
              <CardTitle className="dark:text-white">{t("auth.loginRequired")}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600 dark:text-gray-400">{message || t("auth.loginMessage")}</p>
              <div className="space-y-2">
                <Link href="/login" className="block">
                  <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white">
                    <User className="h-4 w-4 mr-2" />
                    {t("auth.login")}
                  </Button>
                </Link>
                <Link href="/registo" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white bg-transparent dark:border-[#D4AF37] dark:text-[#D4AF37]"
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
