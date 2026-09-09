"use client";

import { FileSearch, Gavel, Handshake, Mic, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMark from "@/components/ui/SectionMark";
import SplitText from "@/components/ui/SplitText";
import { programs } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  gavel: Gavel,
  book: BookOpen,
  mic: Mic,
  search: FileSearch,
  handshake: Handshake,
};

// Asymmetric spans, keyed by index — a large lead item, a secondary item,
// then a tighter three-up row. Deliberately not a uniform card grid.
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];

export default function Programs() {
  return (
    <section id="programs" className="scroll-mt-20 border-t border-surface-2 py-28 sm:py-36">
      <Container>
        <SectionMark clause="Ps. 04" label="Programs" />
        <SplitText
          as="h2"
          text="What We Do"
          className="font-display mt-8 text-4xl tracking-tight text-paper sm:text-5xl"
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          {programs.map((program, i) => {
            const Icon = ICONS[program.icon];
            const isLead = i === 0;
            return (
              <Reveal
                key={program.title}
                delay={i * 0.08}
                className={`group border border-surface-2 p-8 transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-bronze/40 hover:shadow-[0_20px_44px_-24px_rgba(0,0,0,0.8)] ${SPANS[i]} ${
                  isLead ? "sm:p-10" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="num-display text-sm text-mute/50">
                    0{i + 1}
                  </span>
                  <Icon
                    className="h-5 w-5 text-bronze/70 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110"
                    aria-hidden="true"
                  />
                </div>
                <h3
                  className={`font-display mt-8 text-paper ${
                    isLead ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                  }`}
                >
                  {program.title}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-mute">
                  {program.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
