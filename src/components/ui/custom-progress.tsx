
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

interface CustomProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string;
  showValue?: boolean;
  format?: "percentage" | "raw";
  max?: number;
}

const CustomProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CustomProgressProps
>(({ className, value, indicatorClassName, showValue = false, format = "percentage", max = 100, ...props }, ref) => {
  const displayValue = React.useMemo(() => {
    if (!showValue || value === undefined) return null;
    
    if (format === "percentage") {
      return `${Math.round(((value || 0) / max) * 100)}%`;
    }
    
    return value;
  }, [value, showValue, format, max]);
  
  return (
    <div className="relative">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)}
          style={{ transform: `translateX(-${100 - (((value || 0) / max) * 100)}%)` }}
        />
      </ProgressPrimitive.Root>
      
      {showValue && displayValue !== null && (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
          {displayValue}
        </span>
      )}
    </div>
  );
});

CustomProgress.displayName = "CustomProgress";

export { CustomProgress };
