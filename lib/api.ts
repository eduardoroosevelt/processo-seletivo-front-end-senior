import axios from "axios"

export const API_URL = "https://abitus-api.geia.vip"

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Types based on the Swagger documentation
export interface Person {
  id: number
  nome: string
  idade?: number
  sexo?: "MASCULINO" | "FEMININO"
  vivo?: boolean
  urlFoto?: string
  ultimaOcorrencia?: Occurrence
  status?: "DESAPARECIDO" | "LOCALIZADO"
}

export interface PersonDetail extends Person {
  dtNascimento?: string
  mae?: string
  pai?: string
  naturalidadeId?: number
  estadoCivil?: string
  cutis?: string
  // Additional fields from the API
}

export interface Occurrence {
  dtDesaparecimento?: string
  dataLocalizacao?: string
  encontradoVivo?: boolean
  localDesaparecimentoConcat?: string
  ocorrenciaEntrevDesapDTO?: {
    informacao?: string
    vestimentasDesaparecido?: string
  }
  listaCartaz?: Array<{
    urlCartaz?: string
    tipoCartaz?: string
  }>
  ocoId?: number
}

export interface OccurrenceInfo {
  ocoId: number
  informacao: string
  data: string
  id?: number
  anexos?: string[]
}

export interface Statistics {
  quantPessoasDesaparecidas: number
  quantPessoasEncontradas: number
}

export interface SearchParams {
  nome?: string
  faixaIdadeInicial?: number
  faixaIdadeFinal?: number
  sexo?: string
  status?: string
  pagina?: number
  porPagina?: number
}

export interface PaginatedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
  empty: boolean
}

// API functions
export const getPersons = async (params: SearchParams): Promise<PaginatedResponse<Person>> => {
  const response = await api.get("/v1/pessoas/aberto/filtro", { params })
  return response.data
}

export const getPersonById = async (id: number): Promise<PersonDetail> => {
  const response = await api.get(`/v1/pessoas/${id}`)
  return response.data
}

export const getRandomPersons = async (registros = 4): Promise<Person[]> => {
  const response = await api.get("/v1/pessoas/aberto/dinamico", { params: { registros } })
  return response.data
}

export const getStatistics = async (): Promise<Statistics> => {
  const response = await api.get("/v1/pessoas/aberto/estatistico")
  return response.data
}

export const getOccurrenceInfo = async (occurrenceId: number): Promise<OccurrenceInfo[]> => {
  const response = await api.get("/v1/ocorrencias/informacoes-desaparecido", {
    params: { ocorrenciaId: occurrenceId },
  })
  return response.data
}

export const submitOccurrenceInfo = async (data: FormData): Promise<OccurrenceInfo> => {
  const response = await api.post("/v1/ocorrencias/informacoes-desaparecido", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}

