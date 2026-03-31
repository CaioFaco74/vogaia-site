import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  container?: boolean;
}

export function Section({
  container = true,
  className = "",
  children,
  ...props
}: SectionProps) {
  return (
    <section className={`py-16 md:py-24 ${className}`} {...props}>
      {container ? (
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeader({
  badge,
  title,
  description,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}>
      {badge && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-subtle text-orange-primary mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
