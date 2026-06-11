import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-[var(--radius-button)]";
    
    const variants = {
      primary: "bg-[var(--accent)] text-white hover:bg-[#7a8e79] focus:ring-[var(--accent)]",
      secondary: "bg-[var(--paper)] text-[var(--text-primary)] hover:bg-[#e3dcd0] dark:hover:bg-[#3d352f] border border-[#e3dcd0] dark:border-[#3d352f] focus:ring-gray-400",
      ghost: "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--paper)] hover:text-[var(--text-primary)] focus:ring-gray-400",
      danger: "bg-[var(--danger)] text-white hover:bg-[#9d3f3d] focus:ring-[var(--danger)]",
    };
    
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
