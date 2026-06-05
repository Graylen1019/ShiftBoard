import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const OverviewSkeleton = () => {
  return (
    <div className="py-6 px-10">
      <div className="border-b-2 border-border w-full max-w-3xl p-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-32 mt-2" />
      </div>

      <div className="flex w-full max-w-3xl mt-12 justify-between gap-6">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader><Skeleton className="h-5 w-32" /></CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-4 w-40" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><Skeleton className="h-5 w-32" /></CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-36" />
            </CardContent>
          </Card>
        </div>

        <Card className="py-4 px-8 flex-1">
          <CardHeader><Skeleton className="h-5 w-40" /></CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-32" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};