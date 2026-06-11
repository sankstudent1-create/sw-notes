import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "bg-[var(--card)] rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-soft)] transition-shadow duration-300",
          hoverable && "hover:shadow-[var(--shadow-lift)] cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";
