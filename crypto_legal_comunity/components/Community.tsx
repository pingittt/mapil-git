"use client";

import Container from "@/components/ui/Container";
import CountUp from "@/components/ui/CountUp";
import FadeImage from "@/components/ui/FadeImage";
import Reveal from "@/components/ui/Reveal";
import SectionMark from "@/components/ui/SectionMark";
import SplitText from "@/components/ui/SplitText";
import { communityStats, galleryItems } from "@/lib/data";

const SPAN_CLASS: Record<string, string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  regular: "",
};

export default function Community() {
  return (
    <section id="community" className="scroll-mt-20 border-t border-surface-2 py-28 sm:py-36">
      <Container>
        <div className="max-w-2xl">
          <SectionMark clause="Ps. 05" label="Community" />
          <SplitText
            as="h2"
            text="More Than a Community. A Space to Think."
            className="font-display mt-8 text-4xl leading-[1.1] tracking-tight text-paper sm:text-5xl"
          />
        </div>

        {/* Masonry-style collage */}
        <div className="mt-16 grid auto-rows-[130px] grid-cols-2 gap-3 sm:auto-rows-[160px] sm:grid-cols-4 sm:gap-4">
          {galleryItems.map((item, i) => (
            <Reveal
              key={`${item.caption}-${i}`}
              delay={i * 0.07}
              className={`group ${SPAN_CLASS[item.span]} relative overflow-hidden`}
            >
              {/* Skeleton → fade-in; subtle zoom only on hover-capable pointers,
                  and never under reduced motion (handled inside FadeImage). */}
              <FadeImage
                src={item.image}
                alt={item.caption}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                zoomOnHover
                className="object-cover"
              />

              <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] text-paper/70 transition-colors duration-500 group-hover:text-paper">
                {item.caption}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Stats — presented quietly, as a footnote rather than a claim.
            Numbers count up once when they enter the viewport. */}
        <Reveal delay={0.2} className="mt-20 border-t border-surface-2 pt-10 sm:mt-24">
          <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-4 sm:gap-8">
            {communityStats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.1 + i * 0.08} y={16}>
                <span className="num-display text-3xl text-paper sm:text-4xl">
                  <CountUp value={stat.value} />
                </span>
                <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
