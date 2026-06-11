import React from "react";
import clsx from "clsx";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "danger" | "warning" | "sage" | "terracotta" | "lavender" | "amber";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    success: "bg-[#e8f3ec] text-[var(--success)] dark:bg-[rgba(76,138,95,0.2)]",
    danger: "bg-[#fde8e8] text-[var(--danger)] dark:bg-[rgba(185,74,72,0.2)]",
    warning: "bg-[#fdf4e1] text-[#9a7b3c] dark:bg-[rgba(240,192,90,0.2)] text-[var(--amber)]",
    sage: "bg-[#f0f4f0] text-[var(--sage)] dark:bg-[rgba(143,166,142,0.2)]",
    terracotta: "bg-[#f9eee9] text-[var(--terracotta)] dark:bg-[rgba(201,121,84,0.2)]",
    lavender: "bg-[#f5f3f9] text-[var(--lavender)] dark:bg-[rgba(216,209,232,0.2)]",
    amber: "bg-[#fdf4e1] text-[var(--amber)] dark:bg-[rgba(240,192,90,0.2)]",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
