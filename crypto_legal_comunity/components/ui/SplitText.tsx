"use client";

import { motion } from "framer-motion";
import { editorialEase } from "@/lib/motion";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
};

/**
 * Masked, word-by-word headline reveal: each word sits in its own
 * overflow-hidden window and slides up into place. Used sparingly —
 * only for the hero headline and section titles, never on body copy.
 */
export default function SplitText({
  text,
  className = "",
  delay = 0,
  as = "h2",
}: SplitTextProps) {
  const words = text.split(" ");
  const Tag = as;

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
              transition={{
                duration: 0.9,
                delay: delay + i * 0.07,
                ease: editorialEase,
              }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
