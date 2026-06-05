import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const ReportSkeleton = () => {
  return (
    <div className="px-6 py-10 max-w-4xl mx-auto flex flex-col gap-y-8">
      <div className="border-b border-border pb-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-56 mt-2" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-4">
              <Skeleton className="h-3 w-24 mb-2" />
              <Skeleton className="h-10 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><Skeleton className="h-5 w-32" /></CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-28" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><Skeleton className="h-5 w-36" /></CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><Skeleton className="h-5 w-40" /></CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader><Skeleton className="h-5 w-28" /></CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </CardContent>
      </Card>
    </div>
  );
};