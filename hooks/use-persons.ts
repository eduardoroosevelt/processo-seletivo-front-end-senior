"use client"

import { useQuery } from "@tanstack/react-query"
import { getPersons, getPersonById, getRandomPersons, type SearchParams } from "@/lib/api"

export function usePersons(params: SearchParams) {
  return useQuery({
    queryKey: ["persons", params],
    queryFn: () => getPersons(params),
  })
}

export function usePerson(id: number) {
  return useQuery({
    queryKey: ["person", id],
    queryFn: () => getPersonById(id),
    enabled: !!id,
  })
}

export function useRandomPersons(count = 4) {
  return useQuery({
    queryKey: ["randomPersons", count],
    queryFn: () => getRandomPersons(count),
  })
}

