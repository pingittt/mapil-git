"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMark from "@/components/ui/SectionMark";
import SplitText from "@/components/ui/SplitText";
import { fieldConnections, fieldNodes } from "@/lib/data";
import { editorialEase } from "@/lib/motion";

// Hexagonal layout, computed once — six fields, evenly spaced, so the
// diagram reads as a balanced map rather than an arbitrary scatter.
const POSITIONS: Record<string, { x: number; y: number }> = {
  law: { x: 50, y: 13.3 },
  regulation: { x: 81.75, y: 31.7 },
  crypto: { x: 81.75, y: 68.3 },
  investment: { x: 50, y: 86.7 },
  technology: { x: 18.25, y: 68.3 },
  economy: { x: 18.25, y: 31.7 },
};

export default function LegalDigital() {
  return (
    <section className="relative overflow-hidden border-t border-surface-2 py-28 sm:py-36">
      <span
        aria-hidden="true"
        className="font-display pointer-events-none absolute -left-6 top-10 select-none text-[14rem] leading-none text-paper/[0.03]"
      >
        &ldquo;
      </span>

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionMark clause="Ps. 02" label="Intersection" />
            <SplitText
              as="h2"
              text="Where Law Meets Digital Innovation"
              className="font-display mt-8 max-w-md text-4xl leading-[1.1] tracking-tight text-paper sm:text-5xl"
            />
            <Reveal delay={0.2} className="mt-7 max-w-sm text-[15px] leading-relaxed text-mute">
              Six fields, one field of study. CLC treats law, technology, and
              the market not as separate subjects but as clauses in the same
              document — each one referencing the others.
            </Reveal>

            <Reveal delay={0.3} className="mt-10 hidden sm:block">
              <p className="max-w-xs border-l border-bronze/40 pl-4 font-display text-sm italic leading-relaxed text-mute">
                &ldquo;No single field governs the digital economy alone —
                it is read in conjunction with the rest.&rdquo;
                <span className="mt-2 block font-mono text-[10px] not-italic uppercase tracking-[0.2em] text-mute/60">
                  — Editorial note, CLC
                </span>
              </p>
            </Reveal>
          </div>

          {/* Diagram */}
          <div className="lg:col-span-7">
            <Reveal delay={0.15} className="relative mx-auto aspect-square w-full max-w-lg">
              {/* corner marks, echoing the document-plate motif */}
              <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-paper/15" />
              <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-paper/15" />
              <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-paper/15" />
              <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-paper/15" />

              <svg
                viewBox="0 0 600 600"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                {fieldConnections.map(([from, to], i) => {
                  const a = POSITIONS[from];
                  const b = POSITIONS[to];
                  return (
                    <motion.line
                      key={`${from}-${to}`}
                      x1={(a.x / 100) * 600}
                      y1={(a.y / 100) * 600}
                      x2={(b.x / 100) * 600}
                      y2={(b.y / 100) * 600}
                      stroke="var(--color-accent-soft)"
                      strokeOpacity={0.35}
                      strokeWidth={1.25}
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
                      transition={{ duration: 1.1, delay: 0.15 + i * 0.08, ease: editorialEase }}
                    />
                  );
                })}
              </svg>

              {fieldNodes.map((node, i) => {
                const pos = POSITIONS[node.id];
                return (
                  <motion.div
                    key={node.id}
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 border border-surface-2 bg-void px-3 py-2.5 text-center sm:px-4 sm:py-3"
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.08, ease: editorialEase }}
                  >
                    <span className="font-mono text-[9px] text-bronze/70">
                      §{i + 1}
                    </span>
                    <span className="max-w-[72px] text-center font-mono text-[10px] uppercase leading-tight tracking-[0.1em] text-paper sm:max-w-none sm:whitespace-nowrap sm:text-[11px] sm:tracking-[0.14em]">
                      {node.label}
                    </span>
                  </motion.div>
                );
              })}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
