import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({
  hover = true,
  className = "",
  children,
  ...props
}: CardProps) {
  const hoverStyles = hover
    ? "hover:border-orange-primary hover:shadow-lg hover:shadow-orange-primary/5 hover:-translate-y-0.5"
    : "";

  return (
    <div
      className={`bg-bg-card border border-border-subtle rounded-xl p-6 md:p-8 transition-all duration-300 ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
