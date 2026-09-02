"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { editorialEase, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span";
};

/**
 * Standard scroll-reveal used across the page: a quiet fade combined with a
 * small upward slide. Slow, single easing curve, fires once per element.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  as = "div",
}: RevealProps) {
  const MotionTag = as === "span" ? motion.span : motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, delay, ease: editorialEase }}
    >
      {children}
    </MotionTag>
  );
}
