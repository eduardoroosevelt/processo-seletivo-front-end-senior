"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { usePerson } from "@/hooks/use-persons"
import { useOccurrenceInfo } from "@/hooks/use-occurrence-info"
import { InfoSubmissionForm } from "@/components/info-submission-form"
import { PersonDetailSkeleton } from "@/components/loading-skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  AlertCircle,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  Home,
  Info,
  MessageSquarePlus,
  ArrowLeft,
} from "lucide-react"
import { formatDate, formatDateTime, getStatusColor } from "@/lib/utils"
import Link from "next/link"

export default function PersonDetailPage() {
  const params = useParams<{ id: string }>()
  const personId = Number.parseInt(params.id)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { data: person, isLoading: isLoadingPerson, error: personError } = usePerson(personId)

  const occurrenceId = person?.ultimaOcorrencia?.ocoId
  const { data: occurrenceInfo, isLoading: isLoadingInfo } = useOccurrenceInfo(occurrenceId || 0)

  if (isLoadingPerson) {
    return <PersonDetailSkeleton />
  }

  if (personError || !person) {
    return (
      <div className="container py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            Não foi possível carregar os dados da pessoa. Por favor, tente novamente mais tarde.
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const statusColor = getStatusColor(person.status, person.vivo)

  return (
    <div className="container py-8 space-y-8">
      {/* Back button */}
      <div>
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
      </div>

      {/* Person details */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Photo */}
        <div className="w-full md:w-1/3">
          <div className="sticky top-24">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border">
              {person.urlFoto ? (
                <Image
                  src={person.urlFoto || "/placeholder.svg"}
                  alt={person.nome || "Pessoa desaparecida"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <User className="h-24 w-24 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="mt-4">
              <Badge className={`w-full py-2 text-center text-base ${statusColor.bg} ${statusColor.text}`}>
                {person.status === "DESAPARECIDO" || !person.vivo ? "DESAPARECIDO" : "LOCALIZADO"}
              </Badge>
            </div>

            <div className="mt-4">
              <Button className="w-full" onClick={() => setIsDialogOpen(true)}>
                <MessageSquarePlus className="mr-2 h-4 w-4" />
                Enviar Informações
              </Button>
            </div>
          </div>
        </div>

        {/* Person information */}
        <div className="w-full md:w-2/3 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{person.nome}</h1>
            <p className="text-lg text-muted-foreground">
              {person.idade ? `${person.idade} anos` : "Idade não informada"} •
              {person.sexo === "MASCULINO"
                ? " Masculino"
                : person.sexo === "FEMININO"
                  ? " Feminino"
                  : " Sexo não informado"}
            </p>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Detalhes</TabsTrigger>
              <TabsTrigger value="occurrence">Ocorrência</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Informações Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {person.dtNascimento && (
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Data de Nascimento</p>
                        <p className="text-muted-foreground">{formatDate(person.dtNascimento)}</p>
                      </div>
                    </div>
                  )}

                  {person.mae && (
                    <div className="flex items-start">
                      <User className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Nome da Mãe</p>
                        <p className="text-muted-foreground">{person.mae}</p>
                      </div>
                    </div>
                  )}

                  {person.pai && (
                    <div className="flex items-start">
                      <User className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Nome do Pai</p>
                        <p className="text-muted-foreground">{person.pai}</p>
                      </div>
                    </div>
                  )}

                  {person.estadoCivil && (
                    <div className="flex items-start">
                      <User className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Estado Civil</p>
                        <p className="text-muted-foreground">{person.estadoCivil}</p>
                      </div>
                    </div>
                  )}

                  {person.cutis && (
                    <div className="flex items-start">
                      <User className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Cútis</p>
                        <p className="text-muted-foreground">{person.cutis}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact Information if available */}
              {(person.telefones?.length > 0 || person.emails?.length > 0 || person.enderecos?.length > 0) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Phone className="mr-2 h-5 w-5" />
                      Informações de Contato
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {person.telefones?.length > 0 && (
                      <div>
                        <h3 className="font-medium mb-2">Telefones</h3>
                        <div className="space-y-2">
                          {person.telefones.map((telefone, index) => (
                            <div key={index} className="flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>
                                {telefone.numero} ({telefone.tipoTelefone})
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {person.emails?.length > 0 && (
                      <div>
                        <h3 className="font-medium mb-2">E-mails</h3>
                        <div className="space-y-2">
                          {person.emails.map((email, index) => (
                            <div key={index} className="flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{email.endereco}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {person.enderecos?.length > 0 && (
                      <div>
                        <h3 className="font-medium mb-2">Endereços</h3>
                        <div className="space-y-4">
                          {person.enderecos.map((endereco, index) => (
                            <div key={index} className="flex items-start">
                              <Home className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                              <div>
                                <p>
                                  {endereco.tipoLogradouro} {endereco.logradouro}, {endereco.numero}
                                  {endereco.complemento && `, ${endereco.complemento}`}
                                </p>
                                <p>
                                  {endereco.bairro} - {endereco.uf}
                                </p>
                                {endereco.cep && <p>CEP: {endereco.cep}</p>}
                                {endereco.referencia && <p>Referência: {endereco.referencia}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="occurrence" className="space-y-4">
              {person.ultimaOcorrencia ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Info className="mr-2 h-5 w-5" />
                      Detalhes da Ocorrência
                    </CardTitle>
                    <CardDescription>Informações sobre o desaparecimento</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {person.ultimaOcorrencia.dtDesaparecimento && (
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Data do Desaparecimento</p>
                          <p className="text-muted-foreground">
                            {formatDateTime(person.ultimaOcorrencia.dtDesaparecimento)}
                          </p>
                        </div>
                      </div>
                    )}

                    {person.ultimaOcorrencia.localDesaparecimentoConcat && (
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Local do Desaparecimento</p>
                          <p className="text-muted-foreground">{person.ultimaOcorrencia.localDesaparecimentoConcat}</p>
                        </div>
                      </div>
                    )}

                    {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido && (
                      <div className="flex items-start">
                        <User className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Vestimentas</p>
                          <p className="text-muted-foreground">
                            {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}
                          </p>
                        </div>
                      </div>
                    )}

                    {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO?.informacao && (
                      <div className="flex items-start">
                        <Info className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Informações Adicionais</p>
                          <p className="text-muted-foreground">
                            {person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.informacao}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* If person was found */}
                    {person.status === "LOCALIZADO" && person.ultimaOcorrencia.dataLocalizacao && (
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Data da Localização</p>
                          <p className="text-muted-foreground">{formatDate(person.ultimaOcorrencia.dataLocalizacao)}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Sem informações</AlertTitle>
                  <AlertDescription>Não há informações detalhadas sobre a ocorrência.</AlertDescription>
                </Alert>
              )}

              {/* Occurrence Information */}
              {occurrenceId && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquarePlus className="mr-2 h-5 w-5" />
                      Informações Enviadas
                    </CardTitle>
                    <CardDescription>Informações enviadas por cidadãos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingInfo ? (
                      <div className="space-y-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="space-y-2">
                            <div className="h-5 w-1/3 bg-muted rounded animate-pulse" />
                            <div className="h-20 w-full bg-muted rounded animate-pulse" />
                          </div>
                        ))}
                      </div>
                    ) : occurrenceInfo && occurrenceInfo.length > 0 ? (
                      <div className="space-y-4">
                        {occurrenceInfo.map((info, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium">Informação #{index + 1}</h3>
                              <span className="text-sm text-muted-foreground">{formatDate(info.data)}</span>
                            </div>
                            <p className="text-sm">{info.informacao}</p>

                            {info.anexos && info.anexos.length > 0 && (
                              <div className="mt-2">
                                <p className="text-sm font-medium mb-2">Anexos:</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                  {info.anexos.map((anexo, idx) => (
                                    <a
                                      key={idx}
                                      href={anexo}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block"
                                    >
                                      <div className="aspect-square rounded-md border overflow-hidden bg-muted">
                                        <img
                                          src={anexo || "/placeholder.svg"}
                                          alt={`Anexo ${idx + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}

                            {index < occurrenceInfo.length - 1 && <Separator className="my-4" />}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">Nenhuma informação foi enviada sobre esta pessoa.</p>
                        <Button variant="outline" className="mt-4" onClick={() => setIsDialogOpen(true)}>
                          <MessageSquarePlus className="mr-2 h-4 w-4" />
                          Enviar Informações
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Information Submission Dialog */}
      {occurrenceId && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Enviar Informações</DialogTitle>
              <DialogDescription>Ajude a Polícia Judiciária Civil a encontrar {person.nome}.</DialogDescription>
            </DialogHeader>

            <InfoSubmissionForm person={person} occurrenceId={occurrenceId} onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

