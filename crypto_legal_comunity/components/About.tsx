"use client";

import { Scale, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import AnimatedLine from "@/components/ui/AnimatedLine";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMark from "@/components/ui/SectionMark";
import SplitText from "@/components/ui/SplitText";
import { principles } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  "01": Scale,
  "02": ShieldCheck,
  "03": Users,
};

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-surface-2 py-28 sm:py-36">
      <Container>
        <SectionMark clause="Ps. 01" label="About" />

        <div className="mt-8 grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SplitText
              as="h2"
              text="A Community Built for the Digital Era"
              className="font-display text-4xl leading-[1.1] tracking-tight text-paper sm:text-5xl"
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal className="max-w-xl space-y-5 text-[15px] leading-relaxed text-mute sm:text-base">
              <p>
                Crypto Legal Community hadir untuk menjembatani perkembangan
                teknologi dengan pemahaman hukum.
              </p>
              <p>
                Cryptocurrency, digital assets, fintech, artificial
                intelligence, investasi digital, dan ekonomi digital
                berkembang dengan cepat sehingga generasi muda membutuhkan
                literasi hukum yang relevan.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 sm:mt-28">
          <AnimatedLine color="paper" />
          <div className="grid gap-x-8 gap-y-0 sm:grid-cols-3">
            {principles.map((p, i) => {
              const Icon = ICONS[p.number];
              return (
                <Reveal
                  key={p.number}
                  delay={i * 0.1}
                  className="group relative border-b border-surface-2 py-10 sm:border-b-0 sm:border-r sm:pr-8 last:border-r-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="num-display text-lg text-bronze/80">
                      {p.number}
                    </span>
                    <Icon
                      className="h-5 w-5 text-mute/50 transition-colors duration-500 group-hover:text-bronze"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-6 font-display text-xl text-paper sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">
                    {p.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
          <AnimatedLine color="paper" />
        </div>
      </Container>
    </section>
  );
}
