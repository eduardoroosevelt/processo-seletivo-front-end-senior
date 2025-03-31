"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { usePersons, useRandomPersons } from "@/hooks/use-persons"
import { PersonCard } from "@/components/person-card"
import { SearchForm } from "@/components/search-form"
import { Pagination } from "@/components/pagination"
import { PersonCardSkeleton } from "@/components/loading-skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function Home() {
  const searchParams = useSearchParams()
  const [currentPage, setCurrentPage] = useState(0)

  // Get page from URL or default to 0
  useEffect(() => {
    const page = searchParams.get("pagina")
    if (page) {
      setCurrentPage(Number.parseInt(page))
    }
  }, [searchParams])

  // Fetch random featured persons
  const { data: randomPersons, isLoading: isLoadingRandom } = useRandomPersons(4)

  // Fetch persons with default filters (all missing persons)
  const {
    data: personsData,
    isLoading,
    error,
  } = usePersons({
    status: "DESAPARECIDO",
    pagina: currentPage,
    porPagina: 12,
  })

  return (
    <div className="container py-8 space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold tracking-tight">Sistema de Pessoas Desaparecidas</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Ajude a Polícia Judiciária Civil de Mato Grosso a encontrar pessoas desaparecidas. Sua informação pode ser
          crucial para reunir famílias.
        </p>
      </section>

      {/* Search Form */}
      <section>
        <SearchForm />
      </section>

      {/* Featured Persons */}
      {randomPersons && randomPersons.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Pessoas em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoadingRandom
              ? Array.from({ length: 4 }).map((_, i) => <PersonCardSkeleton key={i} />)
              : randomPersons.map((person) => <PersonCard key={person.id} person={person} featured />)}
          </div>
        </section>
      )}

      {/* Recent Missing Persons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Pessoas Desaparecidas Recentes</h2>

        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              Ocorreu um erro ao carregar os dados. Por favor, tente novamente mais tarde.
            </AlertDescription>
          </Alert>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <PersonCardSkeleton key={i} />
            ))}
          </div>
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
              Não foram encontradas pessoas desaparecidas com os critérios informados.
            </AlertDescription>
          </Alert>
        )}
      </section>
    </div>
  )
}

