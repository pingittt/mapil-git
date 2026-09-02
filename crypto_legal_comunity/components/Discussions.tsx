"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMark from "@/components/ui/SectionMark";
import SplitText from "@/components/ui/SplitText";
import { discussions } from "@/lib/data";
import { editorialEase } from "@/lib/motion";

export default function Discussions() {
  return (
    <section className="border-t border-surface-2 py-28 sm:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionMark clause="Ps. 06" label="Agenda" />
            <SplitText
              as="h2"
              text="Upcoming Discussions"
              className="font-display mt-8 text-4xl tracking-tight text-paper sm:text-5xl"
            />
          </div>
          <Reveal delay={0.2} className="max-w-xs text-sm leading-relaxed text-mute">
            Sessions on the calendar — open to members and newcomers alike.
          </Reveal>
        </div>

        <div className="relative mt-16 pl-8 sm:pl-12">
          {/* connecting timeline rule */}
          <motion.span
            aria-hidden="true"
            className="absolute left-0 top-2 w-px origin-top bg-surface-2 sm:left-1"
            style={{ height: "calc(100% - 1rem)" }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
            transition={{ duration: 1.2, ease: editorialEase }}
          />

          <div className="flex flex-col">
            {discussions.map((item, i) => (
              <Reveal
                key={item.number}
                delay={0.2 + i * 0.12}
                className="group relative border-b border-surface-2 py-8 first:pt-0 last:border-b-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-8 top-9 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-bronze/80 sm:-left-12"
                />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
                  <span className="num-display text-lg text-mute/50 sm:w-12">
                    {item.number}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bronze/80 sm:w-48">
                    {item.category}
                  </span>
                  <h3 className="font-display text-xl text-paper transition-colors duration-300 group-hover:text-bronze-soft sm:text-2xl">
                    {item.title}
                  </h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
