"use client"

import { useQuery } from "@tanstack/react-query"
import { getStatistics } from "@/lib/api"

export function useStatistics() {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: getStatistics,
  })
}

