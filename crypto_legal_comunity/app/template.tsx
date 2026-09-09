"use client";

import { motion, useReducedMotion } from "framer-motion";
import { editorialEase } from "@/lib/motion";

// Lightweight route transition (fade + slight slide, ~300ms). Remounts on
// every navigation, so the entrance runs each time without making route
// changes feel slow. Reduced motion → opacity only, no slide.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: editorialEase }}
    >
      {children}
    </motion.div>
  );
}
