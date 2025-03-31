"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, XCircle } from "lucide-react"
import type { SearchParams } from "@/lib/api"

export function SearchForm({ initialValues = {} }: { initialValues?: Partial<SearchParams> }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState<SearchParams>({
    nome: initialValues.nome || searchParams.get("nome") || "",
    faixaIdadeInicial:
      initialValues.faixaIdadeInicial ||
      (searchParams.get("faixaIdadeInicial") ? Number.parseInt(searchParams.get("faixaIdadeInicial")!) : 0),
    faixaIdadeFinal:
      initialValues.faixaIdadeFinal ||
      (searchParams.get("faixaIdadeFinal") ? Number.parseInt(searchParams.get("faixaIdadeFinal")!) : 0),
    sexo: initialValues.sexo || searchParams.get("sexo") || "",
    status: initialValues.status || searchParams.get("status") || "",
  })

  const handleChange = (name: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Build query string
    const params = new URLSearchParams()

    if (filters.nome) params.set("nome", filters.nome)
    if (filters.faixaIdadeInicial) params.set("faixaIdadeInicial", filters.faixaIdadeInicial.toString())
    if (filters.faixaIdadeFinal) params.set("faixaIdadeFinal", filters.faixaIdadeFinal.toString())
    if (filters.sexo) params.set("sexo", filters.sexo)
    if (filters.status) params.set("status", filters.status)

    // Navigate to search page with filters
    router.push(`/busca?${params.toString()}`)
  }

  const handleReset = () => {
    setFilters({
      nome: "",
      faixaIdadeInicial: 0,
      faixaIdadeFinal: 0,
      sexo: "",
      status: "",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <SearchIcon className="h-5 w-5 mr-2" />
          Buscar Pessoas Desaparecidas
        </CardTitle>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                placeholder="Digite o nome"
                value={filters.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="faixaIdadeInicial">Idade Mínima</Label>
              <Input
                id="faixaIdadeInicial"
                type="number"
                min="0"
                placeholder="Idade mínima"
                value={filters.faixaIdadeInicial || ""}
                onChange={(e) =>
                  handleChange("faixaIdadeInicial", e.target.value ? Number.parseInt(e.target.value) : 0)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="faixaIdadeFinal">Idade Máxima</Label>
              <Input
                id="faixaIdadeFinal"
                type="number"
                min="0"
                placeholder="Idade máxima"
                value={filters.faixaIdadeFinal || ""}
                onChange={(e) => handleChange("faixaIdadeFinal", e.target.value ? Number.parseInt(e.target.value) : 0)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sexo">Sexo</Label>
              <Select value={filters.sexo || ""} onValueChange={(value) => handleChange("sexo", value)}>
                <SelectTrigger id="sexo">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos</SelectItem>
                  <SelectItem value="MASCULINO">Masculino</SelectItem>
                  <SelectItem value="FEMININO">Feminino</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Situação</Label>
              <Select value={filters.status || ""} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODOS">Todos</SelectItem>
                  <SelectItem value="DESAPARECIDO">Desaparecido</SelectItem>
                  <SelectItem value="LOCALIZADO">Localizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={handleReset} className="flex items-center">
            <XCircle className="h-4 w-4 mr-2" />
            Limpar
          </Button>
          <Button type="submit" className="flex items-center">
            <SearchIcon className="h-4 w-4 mr-2" />
            Pesquisar
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

