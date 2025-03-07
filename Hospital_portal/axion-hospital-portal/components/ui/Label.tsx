import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define a basic label component as NextUI does not provide one
const NextUILabel = "label";

// Define variants for the label styling
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof NextUILabel>,
  React.ComponentPropsWithoutRef<typeof NextUILabel> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <NextUILabel ref={ref as any} className={cn(labelVariants(), className)} {...props} />
));

Label.displayName = "Label";

export { Label };
