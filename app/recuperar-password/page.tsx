"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RecoverPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleRecover = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate password recovery process
    setTimeout(() => {
      setIsLoading(false)
      setEmailSent(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">LeiriAgenda</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Recuperar Palavra-passe</h2>
          <p className="mt-2 text-sm text-gray-600">Introduza o seu email para receber instruções de recuperação</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">{emailSent ? "Email Enviado!" : "Esqueceu a palavra-passe?"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {emailSent ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-palette-cream-light rounded-full flex items-center justify-center mx-auto">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-gray-600">
                  Enviámos instruções de recuperação para o seu email. Verifique a sua caixa de entrada e siga as
                  instruções.
                </p>
                <p className="text-sm text-gray-500">
                  Não recebeu o email? Verifique a pasta de spam ou tente novamente.
                </p>
                <Button
                  onClick={() => setEmailSent(false)}
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                >
                  Tentar novamente
                </Button>
              </div>
            ) : (
              <form onSubmit={handleRecover} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input id="email" type="email" placeholder="seu@email.com" className="pl-10" required />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  {isLoading ? "A enviar..." : "Enviar Instruções"}
                </Button>
              </form>
            )}

            <div className="text-center text-sm text-gray-600">
              Lembrou-se da palavra-passe?{" "}
              <Link href="/login" className="font-medium text-primary hover:text-[#C3A995]">
                Entre aqui
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Back to login */}
        <div className="text-center">
          <Link href="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-primary">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  )
}
