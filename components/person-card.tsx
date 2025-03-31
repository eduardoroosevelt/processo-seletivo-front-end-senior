"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import type { Person } from "@/lib/api"
import { formatDate } from "@/lib/utils"
import { MapPin, Calendar } from "lucide-react"

interface PersonCardProps {
  person: Person
  featured?: boolean
}

export function PersonCard({ person, featured = false }: PersonCardProps) {
  const statusColor =
    !person.ultimaOcorrencia?.encontradoVivo || !person.vivo
      ? "bg-red-100 text-red-800 hover:bg-red-200"
      : "bg-green-100 text-green-800 hover:bg-green-200"

  const imageHeight = featured ? "h-80" : "h-64"

  return (
    <Link href={`/pessoa/${person.id}`}>
      <Card
        className={`h-full hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden ${featured ? "border-primary/20" : ""}`}
      >
        <div className={`relative w-full ${imageHeight}`}>
          {person.urlFoto ? (
            <Image
              src={person.urlFoto || "/placeholder.svg"}
              alt={person.nome || "Pessoa desaparecida"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={featured}
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=256&width=256"
              }}
            />
          ) : (
            <div className={`w-full ${imageHeight} flex items-center justify-center bg-muted`}>
              <Image
                src="/placeholder.svg?height=256&width=256"
                alt="Sem foto disponível"
                width={100}
                height={100}
                className="opacity-50"
              />
            </div>
          )}

          <Badge className={`absolute top-2 right-2 ${statusColor}`}>

            {!person.ultimaOcorrencia?.encontradoVivo || !person.vivo ? "Desaparecido" : "Localizado"}
          </Badge>
        </div>

        <CardContent className="pt-4">
          <h2 className="text-xl font-semibold line-clamp-1">{person.nome || "Nome não informado"}</h2>

          <div className="mt-2 space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="font-medium mr-2">Idade:</span>
              <span>{person.idade || "Não informada"}</span>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <span className="font-medium mr-2">Sexo:</span>
              <span>
                {person.sexo === "MASCULINO" ? "Masculino" : person.sexo === "FEMININO" ? "Feminino" : "Não informado"}
              </span>
            </div>

            {person.ultimaOcorrencia?.dtDesaparecimento && (
              <div className="flex items-start text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Desaparecido em:</span>{" "}
                  {formatDate(person.ultimaOcorrencia.dtDesaparecimento)}
                </div>
              </div>
            )}

            {person.ultimaOcorrencia?.localDesaparecimentoConcat && (
              <div className="flex items-start text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
                <div className="line-clamp-2">
                  <span className="font-medium">Local:</span> {person.ultimaOcorrencia.localDesaparecimentoConcat}
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="pt-0">
          <div className="w-full flex justify-end">
            <span className="text-xs text-muted-foreground">Clique para detalhes</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

