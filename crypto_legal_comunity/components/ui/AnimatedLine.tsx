"use client";

import { motion } from "framer-motion";
import { editorialEase } from "@/lib/motion";

type AnimatedLineProps = {
  className?: string;
  delay?: number;
  color?: "paper" | "bronze" | "accent";
  orientation?: "horizontal" | "vertical";
};

export default function AnimatedLine({
  className = "",
  delay = 0,
  color = "paper",
  orientation = "horizontal",
}: AnimatedLineProps) {
  const bg =
    color === "bronze"
      ? "bg-bronze/50"
      : color === "accent"
        ? "bg-accent-soft/50"
        : "bg-paper/20";

  const isHorizontal = orientation === "horizontal";

  return (
    <motion.span
      aria-hidden="true"
      className={`block origin-left ${isHorizontal ? "h-px w-full" : "h-full w-px origin-top"} ${bg} ${className}`}
      initial={isHorizontal ? { scaleX: 0 } : { scaleY: 0 }}
      whileInView={isHorizontal ? { scaleX: 1 } : { scaleY: 1 }}
      viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
      transition={{ duration: 1.1, delay, ease: editorialEase }}
    />
  );
}
