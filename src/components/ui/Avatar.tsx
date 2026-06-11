import React from "react";
import clsx from "clsx";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Avatar({ src, fallback, size = "md", className, ...props }: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl",
  };

  return (
    <div
      className={clsx(
        "relative flex items-center justify-center rounded-full overflow-hidden bg-[var(--lavender)] text-[var(--text-primary)] font-semibold shrink-0",
        sizes[size],
        className
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt="Avatar" className="w-full h-full object-cover" />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}
