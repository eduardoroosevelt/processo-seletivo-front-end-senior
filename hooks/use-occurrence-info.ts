"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getOccurrenceInfo, submitOccurrenceInfo } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

export function useOccurrenceInfo(occurrenceId: number) {
  return useQuery({
    queryKey: ["occurrenceInfo", occurrenceId],
    queryFn: () => getOccurrenceInfo(occurrenceId),
    enabled: !!occurrenceId,
  })
}

export function useSubmitOccurrenceInfo() {
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: submitOccurrenceInfo,
    onSuccess: (data, variables) => {
      // Extract occurrenceId from FormData
      const occurrenceId = variables.get("ocoId") as string

      if (occurrenceId) {
        queryClient.invalidateQueries({ queryKey: ["occurrenceInfo", Number.parseInt(occurrenceId)] })
      }

      toast({
        title: "Informação enviada com sucesso",
        description: "Obrigado por contribuir com informações sobre esta pessoa.",
        variant: "default",
      })
    },
    onError: (error) => {
      console.error("Error submitting occurrence info:", error)
      toast({
        title: "Erro ao enviar informação",
        description: "Ocorreu um erro ao enviar as informações. Por favor, tente novamente.",
        variant: "destructive",
      })
    },
  })
}

