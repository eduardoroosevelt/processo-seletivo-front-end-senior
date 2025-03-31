"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
}

export function Pagination({ currentPage, totalPages, totalItems }: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("pagina", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const handlePageChange = (page: number) => {
    router.push(createPageURL(page))
  }

  // Calculate range of pages to show
  const renderPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2))
    const endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 1)

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(0, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          onClick={() => handlePageChange(i)}
          className="h-9 w-9 p-0"
          aria-label={`Página ${i + 1}`}
          aria-current={i === currentPage ? "page" : undefined}
        >
          {i + 1}
        </Button>,
      )
    }

    return pages
  }

  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null

  // Calculate range of items being displayed
  const startItem = currentPage * 10 + 1
  const endItem = Math.min((currentPage + 1) * 10, totalItems)

  return (
    <div className="flex flex-col items-center space-y-2 py-4">
      <div className="flex justify-center items-center space-x-2">
        <Button
          variant="outline"
          onClick={() => handlePageChange(0)}
          disabled={currentPage === 0}
          className="h-9 w-9 p-0"
          aria-label="Primeira página"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          className="h-9 w-9 p-0"
          aria-label="Página anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {renderPageNumbers()}

        <Button
          variant="outline"
          onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
          disabled={currentPage >= totalPages - 1}
          className="h-9 w-9 p-0"
          aria-label="Próxima página"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={currentPage >= totalPages - 1}
          className="h-9 w-9 p-0"
          aria-label="Última página"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Mostrando <span className="font-medium">{startItem}</span> a <span className="font-medium">{endItem}</span> de{" "}
        <span className="font-medium">{totalItems}</span> resultados
      </p>
    </div>
  )
}

