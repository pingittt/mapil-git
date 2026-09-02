"use client";

import { motion } from "framer-motion";
import { editorialEase } from "@/lib/motion";

type SectionMarkProps = {
  clause: string; // e.g. "Ps. 01"
  label: string; // e.g. "ABOUT"
  tone?: "bronze" | "accent";
  align?: "left" | "center";
};

/**
 * The recurring signature device of the site: every section opens with a
 * clause-style reference, borrowing the "Pasal" (Article) numbering used in
 * Indonesian statutes, paired with a monospace technical code. It reads as
 * both a legal citation and a ledger entry — the two halves of CLC's
 * identity in one small piece of typography.
 */
export default function SectionMark({
  clause,
  label,
  tone = "bronze",
  align = "left",
}: SectionMarkProps) {
  const color = tone === "bronze" ? "text-bronze" : "text-accent-soft";

  return (
    <motion.div
      className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px 0px -80px 0px" }}
      transition={{ duration: 0.7, ease: editorialEase }}
    >
      <span className={`font-display italic text-sm tracking-wide ${color}`}>
        {clause}
      </span>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-30" />
      <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-mute">
        {label}
      </span>
    </motion.div>
  );
}
