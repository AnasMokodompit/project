import * as React from "react";

import { cn } from "../../utils/cn";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "placeholder:text-muted-foreground flex min-h-[60px] w-full rounded-lg border-2 border-neutral-500 bg-transparent px-3 py-3 text-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
