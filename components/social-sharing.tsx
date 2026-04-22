"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Share2, 
  Facebook, 
  Twitter, 
  Instagram, 
  WhatsApp, 
  Copy, 
  Mail, 
  Link as LinkIcon,
  Check,
  X,
  Calendar
} from "lucide-react"
import { useToast } from "@/contexts/toast-context"

interface SocialSharingProps {
  event: {
    id: string
    title: string
    description: string
    date: string
    time: string
    location: string
    image: string
    url: string
  }
  onClose?: () => void
}

export function SocialSharing({ event, onClose }: SocialSharingProps) {
  const [copied, setCopied] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const { addToast } = useToast()

  const shareText = `🎉 ${event.title} - ${event.date} às ${event.time} em ${event.location}`
  const shareUrl = `${window.location.origin}/evento/${event.id}`

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=Leiria,Eventos`
    window.open(url, '_blank', 'width=600,height=400')
  }

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
    window.open(url, '_blank')
  }

  const shareToEmail = () => {
    const subject = `Evento: ${event.title}`
    const body = `${shareText}\n\n${shareUrl}\n\nDescrição: ${event.description}`
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = url
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      addToast("Link copiado para a área de transferência!", "success")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      addToast("Erro ao copiar link", "error")
    }
  }

  const shareToInstagram = () => {
    // Instagram não permite partilha direta via URL, mas podemos abrir a app
    addToast("Para partilhar no Instagram, copie o link e cole na sua publicação", "info")
    copyToClipboard()
  }

  const generateQRCode = () => {
    setShowQRCode(!showQRCode)
  }

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700",
      action: shareToFacebook
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500 hover:bg-sky-600",
      action: shareToTwitter
    },
    {
      name: "WhatsApp",
      icon: WhatsApp,
      color: "bg-green-600 hover:bg-green-700",
      action: shareToWhatsApp
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-primary/60 hover:bg-primary/70",
      action: shareToEmail
    },
    {
      name: "Instagram",
      icon: Instagram,
      color: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
      action: shareToInstagram
    }
  ]

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Share2 className="h-5 w-5 mr-2 text-primary" />
            Partilhar Evento
          </CardTitle>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Event Preview */}
        <div className="bg-muted/40 rounded-lg p-3 border">
          <div className="flex items-start space-x-3">
            <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center">
              <Calendar className="h-8 w-8 text-primary/40" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm line-clamp-2">
                {event.title}
              </h4>
              <p className="text-xs text-primary/60 mt-1">
                {event.date} às {event.time}
              </p>
              <p className="text-xs text-primary/60">
                📍 {event.location}
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Buttons */}
        <div>
          <h5 className="text-sm font-medium text-primary/70 mb-3">Partilhar em:</h5>
          <div className="grid grid-cols-2 gap-2">
            {shareOptions.map((option) => (
              <Button
                key={option.name}
                onClick={option.action}
                className={`${option.color} text-white text-sm py-2`}
                size="sm"
              >
                <option.icon className="h-4 w-4 mr-2" />
                {option.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Copy Link Section */}
        <div className="space-y-3">
          <h5 className="text-sm font-medium text-primary/70">Link direto:</h5>
          <div className="flex space-x-2">
            <div className="flex-1 bg-muted/40 border rounded-lg px-3 py-2 text-sm text-primary/60 truncate">
              {shareUrl}
            </div>
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="sm"
              className="flex-shrink-0"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-sm font-medium text-primary/70">QR Code:</h5>
            <Button
              variant="ghost"
              size="sm"
              onClick={generateQRCode}
              className="text-xs"
            >
              {showQRCode ? "Ocultar" : "Mostrar"}
            </Button>
          </div>
          
          {showQRCode && (
            <div className="bg-muted/40 rounded-lg p-4 text-center">
              <div className="w-32 h-32 bg-card rounded-lg mx-auto flex items-center justify-center border-2 border-border">
                <div className="text-center">
                  <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-xs text-primary/50">QR Code</span>
                  </div>
                  <p className="text-xs text-primary/50 mt-2">
                    Escaneie para aceder ao evento
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Share Stats */}
        <div className="pt-3 border-t">
          <div className="flex items-center justify-between text-sm text-primary/60">
            <span>Partilhas:</span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <Facebook className="h-4 w-4 mr-1 text-blue-600" />
                0
              </span>
              <span className="flex items-center">
                <Twitter className="h-4 w-4 mr-1 text-sky-500" />
                0
              </span>
              <span className="flex items-center">
                <WhatsApp className="h-4 w-4 mr-1 text-green-600" />
                0
              </span>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
          <h6 className="text-sm font-medium text-foreground mb-1">💡 Dica</h6>
          <p className="text-xs text-primary/70">
            Partilhe este evento com amigos e familiares para aumentar a participação!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente para botão de partilha rápida
export function QuickShareButton({ event }: { event: SocialSharingProps["event"] }) {
  const [showSharing, setShowSharing] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowSharing(true)}
        className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Partilhar
      </Button>

      {showSharing && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-muted/400 bg-opacity-75 transition-opacity"
              onClick={() => setShowSharing(false)}
            />
            <div className="inline-block align-bottom bg-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
              <SocialSharing 
                event={event} 
                onClose={() => setShowSharing(false)} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
