"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/contexts/toast-context"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, loginWithGoogle } = useAuth()
  const { addToast } = useToast()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      addToast("Por favor preencha todos os campos", "error")
      return
    }

    setIsLoading(true)

    try {
      await login(email, password)
      addToast("Login realizado com sucesso!", "success")
      router.push("/")
    } catch (error) {
      console.error("Erro no login:", error)
      addToast("Credenciais inválidas. Tente novamente.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      await loginWithGoogle()
      addToast("Login com Google realizado com sucesso!", "success")
      router.push("/")
    } catch (error) {
      console.error("Erro no login com Google:", error)
      addToast("Erro no login com Google. Tente novamente.", "error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 bg-background flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Calendar className="h-8 w-8 text-white" />
          </Link>
          <h2 className="text-3xl font-bold text-foreground">Bem-vindo de volta!</h2>
          <p className="mt-2 text-primary/60">
            Faça login na sua conta para continuar
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Entrar na LeiriAgenda</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/40" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Palavra-passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/40" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary/40 hover:text-primary/60"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? "A entrar..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="my-4" />
              
              {/* Google Login */}
              <Button
                type="button"
                variant="outline"
                className="w-full border-border hover:bg-background"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continuar com Google
              </Button>
            </div>

            {/* Links */}
            <div className="mt-6 text-center space-y-2">
              <div className="text-sm">
                <span className="text-primary/60">Não tem conta? </span>
                <Link href="/registo" className="text-primary hover:text-primary/80 font-medium">
                  Registe-se aqui
                </Link>
              </div>
              <div className="text-sm">
                <Link href="/recuperar-password" className="text-primary/60 hover:text-foreground/90">
                  Esqueceu a palavra-passe?
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/" className="text-primary/60 hover:text-foreground/90 text-sm">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}
