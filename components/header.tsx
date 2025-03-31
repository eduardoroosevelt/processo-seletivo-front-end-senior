"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Search, Info, Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useStatistics } from "@/hooks/use-statistics"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: statistics } = useStatistics()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const navItems = [
    { href: "/", label: "Início", icon: <Home className="h-4 w-4 mr-2" /> },
    { href: "/busca", label: "Busca Avançada", icon: <Search className="h-4 w-4 mr-2" /> },
    { href: "/sobre", label: "Sobre", icon: <Info className="h-4 w-4 mr-2" /> },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">PJC-MT</span>
            <span className="hidden md:inline-block text-xl">Pessoas Desaparecidas</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary flex items-center",
                pathname === item.href ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Statistics Badge */}
        {statistics && (
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-xs text-muted-foreground">Desaparecidos</span>
                <span className="font-bold text-red-600">{statistics.quantPessoasDesaparecidas}</span>
              </div>
              <div className="h-8 w-px bg-border"></div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-muted-foreground">Localizados</span>
                <span className="font-bold text-green-600">{statistics.quantPessoasEncontradas}</span>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 border-t">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={cn(
                  "flex items-center px-2 py-1 rounded-md transition-colors",
                  pathname === item.href
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            {/* Mobile Statistics */}
            {statistics && (
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Desaparecidos</span>
                  <span className="font-bold text-red-600">{statistics.quantPessoasDesaparecidas}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Localizados</span>
                  <span className="font-bold text-green-600">{statistics.quantPessoasEncontradas}</span>
                </div>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

