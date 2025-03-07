import * as React from "react";
import { Progress as NextUIProgress, ProgressProps as NextUIProgressProps } from "@nextui-org/react";
import { cn } from "@/lib/utils";

interface ProgressProps extends NextUIProgressProps {
  value: number;
  className?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, ...props }, ref) => (
    <NextUIProgress
      ref={ref}
      aria-label="Progress Bar"
      className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
      value={value}
      {...props}
    />
  )
);

Progress.displayName = "Progress";

export { Progress };
