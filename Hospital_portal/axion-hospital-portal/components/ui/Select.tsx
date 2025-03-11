import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectItem, SelectSection } from "@nextui-org/react";

// Select Trigger Component
const CustomSelectTrigger = React.forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<'button'>>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
);
CustomSelectTrigger.displayName = "CustomSelectTrigger";

// Select Content Component
const CustomSelectContent = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CustomSelectContent.displayName = "CustomSelectContent";

// Custom Select Item Component
interface CustomSelectItemProps extends React.ComponentPropsWithoutRef<'div'> {
  value: string;
}

const CustomSelectItem = React.forwardRef<HTMLDivElement, CustomSelectItemProps>(
  ({ className, children, value, ...props }, ref) => (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      data-value={value} // Ensures proper selection tracking
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
        className
      )}
      {...props}
    >
      <Check className="absolute left-2 h-4 w-4 opacity-0 group-hover:opacity-100" />
      {children}
    </div>
  )
);
CustomSelectItem.displayName = "CustomSelectItem";

// Export Components
export {
  Select,
  CustomSelectTrigger as SelectTrigger,
  CustomSelectContent as SelectContent,
  CustomSelectItem, // Our custom select item
  SelectItem, // NextUI's SelectItem
  SelectSection,
};
