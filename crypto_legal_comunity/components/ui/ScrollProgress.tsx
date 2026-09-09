"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "framer-motion";

// ---------------------------------------------------------------------------
// ScrollProgress — a 2px bronze hairline under the navbar that fills as the
// user scrolls the page. Pure transform (scaleX), runs off rAF via
// useSpring, and disappears entirely under prefers-reduced-motion.
// ---------------------------------------------------------------------------

export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.span
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-bronze/80"
    />
  );
}
