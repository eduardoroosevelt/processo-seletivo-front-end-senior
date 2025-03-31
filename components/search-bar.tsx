"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

export function SearchBar({ onSearch }) {
  const [filters, setFilters] = useState({
    nome: "",
    faixaIdadeInicial: "",
    faixaIdadeFinal: "",
    sexo: "",
    status: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Convert age ranges to numbers or 0 if empty
    const processedFilters = {
      ...filters,
      faixaIdadeInicial: filters.faixaIdadeInicial ? Number.parseInt(filters.faixaIdadeInicial) : 0,
      faixaIdadeFinal: filters.faixaIdadeFinal ? Number.parseInt(filters.faixaIdadeFinal) : 0,
    }

    onSearch(processedFilters)
  }

  const handleReset = () => {
    setFilters({
      nome: "",
      faixaIdadeInicial: "",
      faixaIdadeFinal: "",
      sexo: "",
      status: "",
    })

    onSearch({
      nome: "",
      faixaIdadeInicial: 0,
      faixaIdadeFinal: 0,
      sexo: "",
      status: "",
    })
  }

  return (
    <Card className="p-4 shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" name="nome" placeholder="Digite o nome" value={filters.nome} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="faixaIdadeInicial">Idade Mínima</Label>
            <Input
              id="faixaIdadeInicial"
              name="faixaIdadeInicial"
              type="number"
              min="0"
              placeholder="Idade mínima"
              value={filters.faixaIdadeInicial}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="faixaIdadeFinal">Idade Máxima</Label>
            <Input
              id="faixaIdadeFinal"
              name="faixaIdadeFinal"
              type="number"
              min="0"
              placeholder="Idade máxima"
              value={filters.faixaIdadeFinal}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sexo">Sexo</Label>
            <select
              id="sexo"
              name="sexo"
              value={filters.sexo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Todos</option>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMININO">Feminino</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Situação</Label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Todos</option>
              <option value="DESAPARECIDO">Desaparecido</option>
              <option value="LOCALIZADO">Localizado</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={handleReset}>
            Limpar
          </Button>
          <Button type="submit">Pesquisar</Button>
        </div>
      </form>
    </Card>
  )
}

