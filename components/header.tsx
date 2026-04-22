"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, User, LogOut, Settings, HelpCircle, CalendarDays } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useI18n } from "@/hooks/use-i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout, isAuthenticated, isAdmin } = useAuth()
  const { t } = useI18n()
  const pathname = usePathname()

  const isActivePage = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const getLinkClasses = (path: string) => {
    return isActivePage(path)
      ? "text-primary font-medium border-b border-primary pb-0.5 transition-all font-sans text-sm"
      : "text-primary/60 hover:text-primary transition-colors font-sans text-sm"
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-display text-2xl font-light tracking-wide text-primary">LeiriAgenda</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7">
            <Link href="/" className={getLinkClasses("/")}>{t("nav.home")}</Link>
            <Link href="/eventos" className={getLinkClasses("/eventos")}>{t("nav.events")}</Link>
            <Link href="/submeter" className={getLinkClasses("/submeter")}>{t("nav.submit")}</Link>
            <Link href="/sobre" className={getLinkClasses("/sobre")}>{t("nav.about")}</Link>
            {isAdmin && (
              <Link href="/admin" className={getLinkClasses("/admin")}>Admin</Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <Link href="/favoritos">
                  <Button variant="ghost" size="sm" className="text-primary/60 hover:text-primary hover:bg-primary/5 font-sans text-sm">
                    <Heart className="h-4 w-4 mr-1.5" />
                    {t("nav.favorites")}
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                        <AvatarFallback className="bg-primary text-white text-xs font-sans">
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-sans font-medium text-sm text-foreground">{user?.name}</p>
                        <p className="w-[200px] truncate text-xs text-primary/50 font-sans">{user?.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <Link href="/perfil">
                      <DropdownMenuItem className="font-sans text-sm cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        {t("nav.profile")}
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/meus-eventos">
                      <DropdownMenuItem className="font-sans text-sm cursor-pointer">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {t("nav.myEvents")}
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/favoritos">
                      <DropdownMenuItem className="font-sans text-sm cursor-pointer">
                        <Heart className="mr-2 h-4 w-4" />
                        {t("nav.favorites")}
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/configuracoes">
                      <DropdownMenuItem className="font-sans text-sm cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        {t("nav.settings")}
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href="/ajuda">
                      <DropdownMenuItem className="font-sans text-sm cursor-pointer">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        {t("nav.help")}
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="font-sans text-sm cursor-pointer text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("nav.logout")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-primary/60 hover:text-primary hover:bg-primary/5 font-sans text-sm">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link href="/registo">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-white font-sans text-sm tracking-wide rounded-full px-5">
                    {t("auth.createAccount")}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
              <span className={`bg-primary block transition-all duration-300 h-px w-5 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`bg-primary block transition-all duration-300 h-px w-5 ${isMenuOpen ? "opacity-0" : ""}`} />
              <span className={`bg-primary block transition-all duration-300 h-px w-5 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-5 border-t border-border">
            <nav className="flex flex-col space-y-4 font-sans text-sm">
              <Link href="/" className="text-primary/70 hover:text-primary transition-colors">{t("nav.home")}</Link>
              <Link href="/eventos" className="text-primary/70 hover:text-primary transition-colors">{t("nav.events")}</Link>
              <Link href="/submeter" className="text-primary/70 hover:text-primary transition-colors">{t("nav.submit")}</Link>
              <Link href="/sobre" className="text-primary/70 hover:text-primary transition-colors">{t("nav.about")}</Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                {isAuthenticated ? (
                  <>
                    <Link href="/favoritos">
                      <Button variant="ghost" size="sm" className="justify-start w-full text-primary/70 hover:text-primary font-sans">
                        <Heart className="h-4 w-4 mr-2" />{t("nav.favorites")}
                      </Button>
                    </Link>
                    <Link href="/perfil">
                      <Button variant="ghost" size="sm" className="justify-start w-full text-primary/70 hover:text-primary font-sans">
                        <User className="h-4 w-4 mr-2" />{t("nav.profile")}
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="justify-start w-full text-red-500 hover:text-red-600 font-sans" onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" />{t("nav.logout")}
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="outline" size="sm" className="w-full border-primary/30 text-primary hover:bg-primary hover:text-white font-sans">
                        <User className="h-4 w-4 mr-2" />{t("nav.login")}
                      </Button>
                    </Link>
                    <Link href="/registo">
                      <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-white font-sans">
                        {t("auth.createAccount")}
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
