import React from "react";
import clsx from "clsx";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  color?: "accent" | "success" | "danger" | "amber" | "terracotta";
  size?: "sm" | "md" | "lg";
}

export function Progress({ value, color = "accent", size = "md", className, ...props }: ProgressProps) {
  const colors = {
    accent: "bg-[var(--accent)]",
    success: "bg-[var(--success)]",
    danger: "bg-[var(--danger)]",
    amber: "bg-[var(--amber)]",
    terracotta: "bg-[var(--terracotta)]",
  };

  const sizes = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  return (
    <div
      className={clsx("w-full bg-[var(--paper)] rounded-full overflow-hidden", sizes[size], className)}
      {...props}
    >
      <div
        className={clsx("h-full rounded-full transition-all duration-500 ease-out", colors[color])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
