"use client";

import { Button } from "@/components/ui/button";
import { trackCTAClick, trackWhatsAppClick } from "@/lib/tracking";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface TrackedCTAProps {
  href: string;
  ctaName: string;
  location: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  isWhatsApp?: boolean;
  children: ReactNode;
  className?: string;
}

export function TrackedCTA({
  href,
  ctaName,
  location,
  variant = "primary",
  size = "lg",
  isWhatsApp = false,
  children,
  className,
}: TrackedCTAProps) {
  const handleClick = () => {
    if (isWhatsApp) {
      trackWhatsAppClick(location);
    } else {
      trackCTAClick(ctaName, location);
    }
  };

  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
      {...(isWhatsApp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Button>
  );
}
