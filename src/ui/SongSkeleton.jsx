import { Skeleton } from "./skeleton";

function SongSkeleton({ count = 1 }) {
  return Array.from({ length: count }).map((_, index) => (
    <div key={index} className="flex items-center gap-x-3">
      <Skeleton className="h-16 w-16 rounded-lg" />
      <div className="flex flex-col gap-y-1">
        <Skeleton className="h-4 w-52" />
        <Skeleton className="h-3 w-40" />
      </div>
    </div>
  ));
}

export default SongSkeleton;
