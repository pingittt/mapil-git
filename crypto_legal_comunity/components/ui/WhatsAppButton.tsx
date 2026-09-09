"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { editorialEase } from "@/lib/motion";
import { useSound } from "@/lib/sound/use-sound";

type WhatsAppButtonProps = {
  href: string;
  children: ReactNode;
  icon?: LucideIcon;
  className?: string;
};

/**
 * WhatsApp CTA ("Kirim Data ke WhatsApp" / "Join Via WhatsApp").
 * Premium micro-interaction: hover lift, soft shadow, the WhatsApp icon
 * nudges toward the corner, and a subtle press effect on click. Plays a
 * light notification cue on click (only when sound is enabled by the user).
 * Fully static under prefers-reduced-motion.
 */
export default function WhatsAppButton({
  href,
  children,
  icon: Icon,
  className = "",
}: WhatsAppButtonProps) {
  const reduce = useReducedMotion();
  const { play } = useSound();

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => play("notification")}
      whileHover={reduce ? undefined : { y: -2, scale: 1.01 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.25, ease: editorialEase }}
      className={`clc-sheen group inline-flex items-center justify-center gap-2.5 bg-paper px-7 py-3.5 text-sm uppercase tracking-[0.18em] text-void shadow-[0_0_0_0_rgba(168,139,90,0)] transition-colors duration-300 hover:bg-bronze hover:shadow-[0_14px_36px_-14px_rgba(168,139,90,0.45)] ${className}`}
    >
      <span>{children}</span>
      {Icon && (
        <Icon
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </motion.a>
  );
}
