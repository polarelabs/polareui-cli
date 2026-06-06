import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        className={cn(
          // base
          "inline-flex items-center justify-center gap-2 font-medium rounded-md border transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          // sizes
          size === "sm" && "h-8 px-3 text-sm",
          size === "md" && "h-10 px-4 text-sm",
          size === "lg" && "h-12 px-6 text-base",
          // variants
          variant === "primary" &&
            "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] border-transparent hover:opacity-90",
          variant === "secondary" &&
            "bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)] border-transparent hover:opacity-80",
          variant === "outline" &&
            "bg-transparent text-[var(--color-foreground)] border-[var(--color-border)] hover:bg-[var(--color-surface)]",
          variant === "ghost" &&
            "bg-transparent text-[var(--color-foreground)] border-transparent hover:bg-[var(--color-surface)]",
          variant === "destructive" &&
            "bg-[var(--color-destructive)] text-white border-transparent hover:opacity-90",
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }