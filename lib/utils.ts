import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  if (!dateString) return "Data não informada"

  try {
    const date = typeof dateString === "string" ? parseISO(dateString) : new Date(dateString)

    return format(date, "dd/MM/yyyy", { locale: ptBR })
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Data inválida"
  }
}

export function formatDateTime(dateString: string): string {
  if (!dateString) return "Data não informada"

  try {
    const date = typeof dateString === "string" ? parseISO(dateString) : new Date(dateString)

    return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Data inválida"
  }
}

export function getStatusColor(status: string | undefined, vivo: boolean | undefined) {
  if (status === "DESAPARECIDO" || !vivo) {
    return {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-200",
      hover: "hover:bg-red-200",
    }
  }

  return {
    bg: "bg-green-100",
    text: "text-green-800",
    border: "border-green-200",
    hover: "hover:bg-green-200",
  }
}

