"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { usePersons } from "@/hooks/use-persons"
import { PersonCard } from "@/components/person-card"
import { SearchForm } from "@/components/search-form"
import { Pagination } from "@/components/pagination"
import { SearchResultsSkeleton } from "@/components/loading-skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Search } from "lucide-react"
import type { SearchParams } from "@/lib/api"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(0)
  const [filters, setFilters] = useState<SearchParams>({
    nome: "",
    faixaIdadeInicial: 0,
    faixaIdadeFinal: 0,
    sexo: "",
    status: "",
    pagina: 0,
    porPagina: 12,
  })

  // Update filters and page from URL params
  useEffect(() => {
    const newFilters: SearchParams = {
      nome: searchParams.get("nome") || "",
      faixaIdadeInicial: searchParams.get("faixaIdadeInicial")
        ? Number.parseInt(searchParams.get("faixaIdadeInicial")!)
        : 0,
      faixaIdadeFinal: searchParams.get("faixaIdadeFinal") ? Number.parseInt(searchParams.get("faixaIdadeFinal")!) : 0,
      sexo: searchParams.get("sexo") || "",
      status: searchParams.get("status") || "",
      pagina: searchParams.get("pagina") ? Number.parseInt(searchParams.get("pagina")!) : 0,
      porPagina: 12,
    }

    setFilters(newFilters)
    setCurrentPage(newFilters.pagina || 0)
  }, [searchParams])

  // Fetch persons with filters
  const { data: personsData, isLoading, error } = usePersons(filters)

  // Check if any filter is active
  const hasActiveFilters =
    filters.nome || filters.faixaIdadeInicial > 0 || filters.faixaIdadeFinal > 0 || filters.sexo || filters.status

  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-3xl font-bold flex items-center">
        <Search className="mr-2 h-6 w-6" />
        Busca Avançada
      </h1>

      {/* Search Form */}
      <SearchForm initialValues={filters} />

      {/* Search Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Resultados da Busca</h2>

          {personsData && (
            <p className="text-sm text-muted-foreground">
              {personsData.totalElements}{" "}
              {personsData.totalElements === 1 ? "pessoa encontrada" : "pessoas encontradas"}
            </p>
          )}
        </div>

        {!hasActiveFilters && !isLoading ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Nenhum filtro aplicado</AlertTitle>
            <AlertDescription>Utilize os filtros acima para buscar pessoas desaparecidas.</AlertDescription>
          </Alert>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.
            </AlertDescription>
          </Alert>
        ) : isLoading ? (
          <SearchResultsSkeleton />
        ) : personsData?.content && personsData.content.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {personsData.content.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={personsData.totalPages}
              totalItems={personsData.totalElements}
            />
          </>
        ) : (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Nenhum resultado</AlertTitle>
            <AlertDescription>
              Não foram encontradas pessoas com os critérios informados. Tente ajustar os filtros.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}

