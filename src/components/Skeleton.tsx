import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "h-12 w-full animate-pulse rounded-2xl bg-gray-200",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
