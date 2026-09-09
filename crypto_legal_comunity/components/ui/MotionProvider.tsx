"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect } from "react";

/**
 * Global motion policy. Two responsibilities:
 *
 * 1. MotionConfig `reducedMotion="user"` — when the OS asks for reduced
 *    motion, every framer-motion transform animation (slide, scale, parallax
 *    driver values, stagger entrances) is disabled site-wide while opacity
 *    fades still run, so content never appears "stuck". This complements the
 *    CSS-side reduced-motion block in globals.css (which already kills CSS
 *    transitions/keyframes and smooth scrolling).
 * 2. Keeps `html` in sync with a `reduce-motion` class for the few styles
 *    that need to react outside framer-motion.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("reduce-motion", Boolean(reduce));
    return () => document.documentElement.classList.remove("reduce-motion");
  }, [reduce]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
