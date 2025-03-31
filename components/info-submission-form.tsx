"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload, X, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useSubmitOccurrenceInfo } from "@/hooks/use-occurrence-info"
import type { Person } from "@/lib/api"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const formSchema = z.object({
  informacao: z.string().min(10, {
    message: "A informação deve ter pelo menos 10 caracteres",
  }),
  descricao: z.string().min(5, {
    message: "A descrição deve ter pelo menos 5 caracteres",
  }),
  data: z.date({
    required_error: "Por favor, selecione uma data",
  }),
  files: z
    .custom<FileList>()
    .refine((files) => files.length <= 5, "Máximo de 5 arquivos permitidos")
    .refine((files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE), "Tamanho máximo de arquivo é 5MB")
    .refine(
      (files) => Array.from(files).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Apenas imagens nos formatos .jpg, .jpeg, .png e .webp são aceitas",
    )
    .optional(),
})

type FormValues = z.infer<typeof formSchema>

interface InfoSubmissionFormProps {
  person: Person
  occurrenceId: number
  onSuccess?: () => void
}

export function InfoSubmissionForm({ person, occurrenceId, onSuccess }: InfoSubmissionFormProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const { mutate, isPending } = useSubmitOccurrenceInfo()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      informacao: "",
      descricao: "",
      data: new Date(),
    },
  })

  const selectedDate = watch("data")

  const onSubmit = (data: FormValues) => {
    const formData = new FormData()
    formData.append("informacao", data.informacao)
    formData.append("descricao", data.descricao)
    formData.append("data", format(data.data, "yyyy-MM-dd"))
    formData.append("ocoId", occurrenceId.toString())

    if (selectedFiles.length > 0) {
      selectedFiles.forEach((file) => {
        formData.append("files", file)
      })
    }

    mutate(formData, {
      onSuccess: () => {
        reset()
        setSelectedFiles([])
        if (onSuccess) onSuccess()
      },
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setSelectedFiles(filesArray)
      setValue("files", e.target.files)
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles]
    newFiles.splice(index, 1)
    setSelectedFiles(newFiles)

    // Create a new FileList-like object
    const dataTransfer = new DataTransfer()
    newFiles.forEach((file) => {
      dataTransfer.items.add(file)
    })

    setValue("files", dataTransfer.files)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Enviar Informações sobre {person.nome}</h3>
        <p className="text-sm text-muted-foreground">
          Se você possui informações sobre esta pessoa, por favor preencha o formulário abaixo. Todas as informações
          serão analisadas pela Polícia Judiciária Civil.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="informacao" className="block text-sm font-medium">
            Informação <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="informacao"
            placeholder="Descreva detalhadamente a informação que você possui sobre esta pessoa"
            className="min-h-[120px]"
            {...register("informacao")}
          />
          {errors.informacao && <p className="text-sm text-red-500">{errors.informacao.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="descricao" className="block text-sm font-medium">
            Descrição do Anexo <span className="text-red-500">*</span>
          </label>
          <Input id="descricao" placeholder="Descreva os anexos que você está enviando" {...register("descricao")} />
          {errors.descricao && <p className="text-sm text-red-500">{errors.descricao.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Data da Visualização <span className="text-red-500">*</span>
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP", { locale: ptBR })
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => setValue("data", date as Date)}
                disabled={(date) => date > new Date()}
                initialFocus
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
          {errors.data && <p className="text-sm text-red-500">{errors.data.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="files" className="block text-sm font-medium">
            Anexar Fotos (opcional)
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="files"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Clique para enviar</span> ou arraste e solte
                </p>
                <p className="text-xs text-muted-foreground">JPG, PNG ou WEBP (máx. 5MB por arquivo)</p>
              </div>
              <input
                id="files"
                type="file"
                className="hidden"
                multiple
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleFileChange}
              />
            </label>
          </div>
          {errors.files && <p className="text-sm text-red-500">{errors.files.message}</p>}

          {/* Preview de arquivos selecionados */}
          {selectedFiles.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Arquivos selecionados:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-md border overflow-hidden bg-muted">
                      <img
                        src={URL.createObjectURL(file) || "/placeholder.svg"}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <p className="text-xs truncate mt-1">{file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "Enviar Informações"
        )}
      </Button>
    </form>
  )
}

