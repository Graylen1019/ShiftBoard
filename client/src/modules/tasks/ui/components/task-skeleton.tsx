import { Skeleton } from '@/components/ui/skeleton';

export const TaskSkeleton = () => {
  return (
    <div className="px-6 py-10 max-w-4xl mx-auto flex flex-col gap-y-8">
      <div className="border-b border-border pb-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-64 mt-2" />
      </div>

      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="h-4 w-24 mb-3" />
          <div className="flex flex-col gap-y-2">
            {Array.from({ length: 2 }).map((_, j) => (
              <div key={j} className="flex items-center justify-between p-4 bg-panel-bg border border-border-color rounded-xl">
                <div className="flex items-center gap-x-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <div className="flex gap-x-2">
                  <Skeleton className="h-8 w-24 rounded-xl" />
                  <Skeleton className="h-8 w-20 rounded-xl" />
                  <Skeleton className="h-8 w-20 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};