import { Skeleton } from "@/components/ui/skeleton"

export function PersonCardSkeleton() {
  return (
    <div className="h-full border rounded-lg overflow-hidden">
      <Skeleton className="h-64 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  )
}

export function PersonDetailSkeleton() {
  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <Skeleton className="h-80 w-full md:w-1/3 rounded-lg" />

        <div className="w-full md:w-2/3 space-y-4">
          <Skeleton className="h-10 w-3/4" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>

          <Skeleton className="h-10 w-40 mt-4" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  )
}

export function SearchResultsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <PersonCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

