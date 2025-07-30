"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RefreshCw } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"

export function AvatarChanger() {
  const { user, updateAvatar } = useAuth()
  const { toast } = useToast()
  const [isChanging, setIsChanging] = useState(false)

  if (!user) return null

  const generateNewAvatar = () => {
    const randomSeed = Math.random().toString(36).substr(2, 9)
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}&backgroundColor=transparent`
  }

  const handleChangeAvatar = () => {
    setIsChanging(true)
    const newAvatar = generateNewAvatar()
    
    // Simular delay para mostrar loading
    setTimeout(() => {
      updateAvatar(newAvatar)
      setIsChanging(false)
      toast({
        title: "Avatar atualizado!",
        description: "O seu avatar foi alterado com sucesso.",
      })
    }, 500)
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-primary">Avatar do Perfil</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-primary text-white text-lg">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <Button 
          onClick={handleChangeAvatar}
          disabled={isChanging}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isChanging ? 'animate-spin' : ''}`} />
          {isChanging ? 'A alterar...' : 'Gerar Novo Avatar'}
        </Button>
        
        <p className="text-sm text-primary/60 text-center">
          Clique para gerar um novo avatar aleatório
        </p>
      </CardContent>
    </Card>
  )
}
