import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "orange" | "muted";
}

export function Badge({
  variant = "orange",
  className = "",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    orange: "bg-orange-subtle text-orange-primary",
    muted: "bg-bg-card text-text-muted",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
