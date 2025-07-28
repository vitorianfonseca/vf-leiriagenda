"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Heart, User, LogOut, Settings, HelpCircle } from "lucide-react"
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
  const { user, logout, isAuthenticated } = useAuth()
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-[#C17C5D]" />
            <span className="text-2xl font-bold text-[#C17C5D]">LeiriAgenda</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-[#C17C5D] transition-colors">
              {t("nav.home")}
            </Link>
            <Link href="/eventos" className="text-gray-700 dark:text-gray-300 hover:text-[#C17C5D] transition-colors">
              {t("nav.events")}
            </Link>
            <Link href="/submeter" className="text-gray-700 dark:text-gray-300 hover:text-[#C17C5D] transition-colors">
              {t("nav.submit")}
            </Link>
            <Link href="/sobre" className="text-gray-700 dark:text-gray-300 hover:text-[#C17C5D] transition-colors">
              {t("nav.about")}
            </Link>
            <Link href="/ajuda" className="text-gray-700 dark:text-gray-300 hover:text-[#C17C5D] transition-colors">
              {t("nav.help")}
            </Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/favoritos">
                  <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 hover:text-[#C17C5D]">
                    <Heart className="h-4 w-4 mr-2" />
                    {t("nav.favorites")}
                  </Button>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                        <AvatarFallback className="bg-[#C17C5D] text-white">
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user?.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <Link href="/perfil">
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>{t("nav.profile")}</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/meus-eventos">
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{t("nav.myEvents")}</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/favoritos">
                      <DropdownMenuItem>
                        <Heart className="mr-2 h-4 w-4" />
                        <span>{t("nav.favorites")}</span>
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/configuracoes">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{t("nav.settings")}</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href="/ajuda">
                      <DropdownMenuItem>
                        <HelpCircle className="mr-2 h-4 w-4" />
                        <span>{t("nav.help")}</span>
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t("nav.logout")}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/favoritos">
                  <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 hover:text-[#C17C5D]">
                    <Heart className="h-4 w-4 mr-2" />
                    {t("nav.favorites")}
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#C17C5D] text-[#C17C5D] hover:bg-[#C17C5D] hover:text-white bg-transparent"
                  >
                    <User className="h-4 w-4 mr-2" />
                    {t("nav.login")}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`bg-gray-700 dark:bg-gray-300 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`}
              ></span>
              <span
                className={`bg-gray-700 dark:bg-gray-300 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
              ></span>
              <span
                className={`bg-gray-700 dark:bg-gray-300 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"}`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-[#C17C5D] transition-colors">
                {t("nav.home")}
              </Link>
              <Link href="/eventos" className="text-gray-700 dark:text-gray-300 hover:text-[#C17C5D] transition-colors">
                {t("nav.events")}
              </Link>
              <Link
                href="/submeter"
                className="text-gray-700 dark:text-gray-300 hover:text-[#C17C5D] transition-colors"
              >
                {t("nav.submit")}
              </Link>
              <Link href="/sobre" className="text-gray-700 dark:text-gray-300 hover:text-[#C17C5D] transition-colors">
                {t("nav.about")}
              </Link>
              <Link href="/ajuda" className="text-gray-700 dark:text-gray-300 hover:text-[#C17C5D] transition-colors">
                {t("nav.help")}
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                {isAuthenticated ? (
                  <>
                    <Link href="/favoritos">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-gray-700 dark:text-gray-300 hover:text-[#C17C5D]"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        {t("nav.favorites")}
                      </Button>
                    </Link>
                    <Link href="/perfil">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-gray-700 dark:text-gray-300 hover:text-[#C17C5D]"
                      >
                        <User className="h-4 w-4 mr-2" />
                        {t("nav.profile")}
                      </Button>
                    </Link>
                    <Link href="/configuracoes">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-gray-700 dark:text-gray-300 hover:text-[#C17C5D]"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        {t("nav.settings")}
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="justify-start text-gray-700 dark:text-gray-300 hover:text-[#C17C5D]"
                      onClick={logout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t("nav.logout")}
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/favoritos">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start text-gray-700 dark:text-gray-300 hover:text-[#C17C5D]"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        {t("nav.favorites")}
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button
                        variant="outline"
                        size="sm"
                        className="justify-start border-[#C17C5D] text-[#C17C5D] hover:bg-[#C17C5D] hover:text-white bg-transparent"
                      >
                        <User className="h-4 w-4 mr-2" />
                        {t("nav.login")}
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
