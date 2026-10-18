import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// 16px text stops iOS from zooming in when an input is focused; h-12 = 48px tap target.
// scroll-mt keeps a focused field from hiding under the sticky top bar.
export const inputClass =
  "block h-12 w-full scroll-mt-28 rounded-xl border border-input bg-card px-4 text-base text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 aria-invalid:border-destructive disabled:opacity-60";

// Tells screen readers which field has an error and where its message is
export function describe(id: string, error?: string) {
  return {
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
}

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
};

export function Field({ id, label, error, hint, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

// Native <select> so phones show their own picker. The arrow is drawn on top.
export function SelectWrap({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}
