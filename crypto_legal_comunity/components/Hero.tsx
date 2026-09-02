"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SplitText from "@/components/ui/SplitText";
import { siteMeta } from "@/lib/data";
import { editorialEase } from "@/lib/motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Subtle parallax — the visual drifts slower than the page, never more.
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 md:pt-32"
    >
      <Container className="grid w-full items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        {/* Text column */}
        <motion.div style={{ y: textY }} className="relative">
          <Reveal className="mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] text-mute">
            <span>{siteMeta.established}</span>
            <span aria-hidden="true" className="h-px w-8 bg-mute/40" />
            <span>{siteMeta.location}</span>
          </Reveal>

          <SplitText
            as="h1"
            text="LAW. DIGITAL ECONOMY. CRYPTO."
            className="font-display max-w-2xl text-[2.75rem] leading-[1.05] tracking-tight text-paper sm:text-6xl lg:text-[4.75rem]"
          />

          <Reveal delay={0.15} className="mt-6">
            <p className="max-w-md font-display text-xl italic text-bronze-soft sm:text-2xl">
              Understanding Law in a Digital Economy.
            </p>
          </Reveal>

          <Reveal delay={0.25} className="mt-7 max-w-lg text-balance-pretty text-[15px] leading-relaxed text-mute sm:text-base">
            Crypto Legal Community is a space for students, legal enthusiasts,
            and digital economy practitioners to explore the intersection of
            law, investment, cryptocurrency, and emerging technology.
          </Reveal>

          <Reveal delay={0.35} className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="#community" variant="primary">
              Explore Community
            </Button>
            <Button href="#contact" variant="secondary" icon={false}>
              Join CLC
            </Button>
          </Reveal>

          <Reveal delay={0.45} className="mt-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-mute/70">
              Legal <span className="text-bronze/70">×</span> Digital{" "}
              <span className="text-bronze/70">×</span> Community
            </p>
          </Reveal>
        </motion.div>

        {/* Visual column */}
        <motion.div
          style={{ y: visualY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: editorialEase, delay: 0.2 }}
          className="relative aspect-[4/5] w-full lg:aspect-[3/4]"
        >
 <Image
  src="/image/logo2.png"   // sebelumnya: "/.next/image/img1.jpeg"
  alt="Diskusi legal digital economy"
  fill
  className="object-cover"
/>
        </motion.div>
      </Container>

      {/* Scroll cue */}
      <Reveal
        delay={0.8}
        className="absolute inset-x-0 bottom-8 hidden justify-center sm:flex"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute/60">
            Scroll
          </span>
          <motion.span
            aria-hidden="true"
            className="h-10 w-px bg-mute/30"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: editorialEase, delay: 1 }}
            style={{ transformOrigin: "top" }}
          />
        </div>
      </Reveal>
    </section>
  );
}
