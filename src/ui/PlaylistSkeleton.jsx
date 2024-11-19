import { Skeleton } from "./skeleton";

function PlaylistSkeleton({ count = 1 }) {
  return Array.from({ length: count }).map((_, index) => (
    <div key={index} className="relative col-span-6 cursor-pointer flex flex-col gap-y-2">
      <Skeleton className="h-44 w-full rounded-lg" />

      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-3 w-20" />
    </div>
  ));
}

export default PlaylistSkeleton;
