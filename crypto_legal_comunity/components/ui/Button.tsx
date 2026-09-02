"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  icon?: boolean;
  className?: string;
};

/**
 * Sharp-cornered, editorial CTA button. No pill shapes, no glow — a solid
 * or outlined rectangle with a small arrow that shifts on hover. The
 * bronze accent only appears transiently, on the primary button's hover
 * state, keeping accent use genuinely sparing.
 */
export default function Button({
  href,
  children,
  variant = "primary",
  icon = true,
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm tracking-wide transition-colors duration-300";

  const styles =
    variant === "primary"
      ? "bg-paper text-void hover:bg-bronze"
      : "border border-paper/25 text-paper hover:border-paper/60";

  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      <span>{children}</span>
      {icon && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </a>
  );
}
