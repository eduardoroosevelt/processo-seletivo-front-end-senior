import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, HelpCircle, Info, Search, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-3xl font-bold flex items-center">
        <Info className="mr-2 h-6 w-6" />
        Sobre o Sistema
      </h1>

      <div className="prose prose-slate max-w-none dark:prose-invert">
        <p className="text-lg">
          O Sistema de Pessoas Desaparecidas da Polícia Judiciária Civil de Mato Grosso é uma ferramenta desenvolvida
          para auxiliar na localização de pessoas desaparecidas no estado.
        </p>

        <p>
          Este sistema permite que qualquer cidadão consulte informações sobre pessoas desaparecidas e contribua com
          informações que possam ajudar na localização dessas pessoas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Como Buscar
            </CardTitle>
            <CardDescription>Aprenda a utilizar os filtros de busca</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Utilize os filtros disponíveis na página inicial ou na página de busca avançada para encontrar pessoas
              desaparecidas. Você pode filtrar por nome, idade, sexo e situação.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2 h-5 w-5" />
              Como Ajudar
            </CardTitle>
            <CardDescription>Contribua com informações</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Se você possui informações sobre alguma pessoa desaparecida, acesse a página de detalhes da pessoa e
              clique no botão "Enviar Informações". Preencha o formulário com o máximo de detalhes possível e anexe
              fotos, se disponíveis.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5" />
              Emergências
            </CardTitle>
            <CardDescription>Em caso de emergência</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Em casos de emergência ou para registrar um desaparecimento, entre em contato com a delegacia mais próxima
              ou ligue para os números:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              <li>Polícia Civil: 197</li>
              <li>Polícia Militar: 190</li>
              <li>Disque Denúncia: 181</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Sobre a Polícia Judiciária Civil de Mato Grosso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            A Polícia Judiciária Civil do Estado de Mato Grosso é o órgão do sistema de segurança pública ao qual
            compete, nos termos do artigo 144, § 4º, da Constituição Federal e artigo 77, § 1º, da Constituição
            Estadual, ressalvada a competência da União, as funções de polícia judiciária e a apuração de infrações
            penais, exceto as militares.
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Para mais informações, visite o site oficial da{" "}
            <a
              href="https://www.pjc.mt.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Polícia Judiciária Civil de Mato Grosso
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

