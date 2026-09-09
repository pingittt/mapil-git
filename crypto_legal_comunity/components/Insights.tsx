"use client";

import { ArrowUpRight } from "lucide-react";
import AnimatedLine from "@/components/ui/AnimatedLine";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMark from "@/components/ui/SectionMark";
import SplitText from "@/components/ui/SplitText";
import { insights } from "@/lib/data";

export default function Insights() {
  return (
    <section id="insights" className="scroll-mt-20 border-t border-surface-2 py-28 sm:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionMark clause="Ps. 03" label="Insights" />
            <SplitText
              as="h2"
              text="Latest Insights"
              className="font-display mt-8 text-4xl tracking-tight text-paper sm:text-5xl"
            />
          </div>
          <Reveal delay={0.2} className="max-w-xs text-sm leading-relaxed text-mute">
            Reading on regulation, digital assets, and the legal questions
            the market keeps raising.
          </Reveal>
        </div>

        <div className="mt-16">
          <AnimatedLine />
          {insights.map((item, i) => (
            <Reveal key={item.number} delay={i * 0.08}>
              <div
                className="group relative grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-4 border-b border-surface-2 py-8 transition-colors duration-300 hover:bg-surface/40 sm:grid-cols-[3rem_7rem_1fr_auto] sm:items-center sm:gap-x-8 sm:px-4"
              >
                {/* Bronze hairline slides in under the row on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-0 bg-bronze/60 transition-all duration-500 ease-out group-hover:w-full"
                />
                <span className="num-display text-lg text-bronze/70 sm:text-xl">
                  {item.number}
                </span>

                <div className="order-3 flex gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-mute sm:order-none sm:flex-col sm:gap-1.5">
                  <span>{item.date}</span>
                  <span className="text-mute/60">{item.category}</span>
                </div>

                <div className="order-2 max-w-xl sm:order-none">
                  <h3 className="font-display text-xl leading-snug text-paper transition-colors duration-300 group-hover:text-bronze-soft sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-mute">
                    {item.description}
                  </p>
                </div>

                <ArrowUpRight
                  className="order-4 h-5 w-5 shrink-0 text-mute transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bronze sm:order-none"
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
