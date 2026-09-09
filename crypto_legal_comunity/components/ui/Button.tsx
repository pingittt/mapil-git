"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { useSound } from "@/lib/sound/use-sound";

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
  const { play } = useSound();
  const base =
    "group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm tracking-wide transition-[color,background-color,transform,box-shadow] duration-300 hover:scale-[1.02] active:scale-[0.98] will-change-transform";

  const styles =
    variant === "primary"
      ? "clc-sheen bg-paper text-void shadow-[0_0_0_0_rgba(168,139,90,0)] hover:bg-bronze hover:shadow-[0_14px_36px_-16px_rgba(168,139,90,0.4)]"
      : "border border-paper/25 text-paper hover:border-paper/60";

  return (
    <a
      href={href}
      onClick={() => play("click")}
      className={`${base} ${styles} ${className}`}
    >
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
