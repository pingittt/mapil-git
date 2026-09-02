"use client";

import {
  ArrowUpRight,
  AtSign,
  Mail,
  MessageCircle,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionMark from "@/components/ui/SectionMark";
import SplitText from "@/components/ui/SplitText";
import { contactChannels } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  mail: Mail,
  at: AtSign,
  whatsapp: MessageCircle,
  users: Users,
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-surface-2 py-28 sm:py-40"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <SectionMark clause="Ps. 07" label="Contact" align="center" />

          <SplitText
            as="h2"
            text="Let's Start a Conversation."
            className="font-display mt-8 text-4xl leading-[1.1] tracking-tight text-paper sm:text-6xl"
          />
        </div>

        <div className="mx-auto mt-16 max-w-xl">
          {contactChannels.map((channel, i) => {
            const Icon = ICONS[channel.icon];

            if (!Icon) {
              return null;
            }

            const isExternal = channel.href.startsWith("http");

            return (
              <Reveal key={channel.label} delay={i * 0.08}>
                <a
                  href={channel.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={
                    isExternal
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex flex-col gap-2 border-b border-surface-2 py-6 transition-colors duration-300 hover:border-bronze/40 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span className="flex shrink-0 items-center gap-4">
                    <Icon
                      className="h-4 w-4 text-mute/60 transition-colors duration-300 group-hover:text-bronze"
                      aria-hidden="true"
                    />

                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                      {channel.label}
                    </span>
                  </span>

                  <span className="flex min-w-0 items-center gap-3 break-words font-display text-base text-paper transition-colors duration-300 group-hover:text-bronze-soft sm:text-lg">
                    {channel.value}

                    <ArrowUpRight
                      className="h-4 w-4 shrink-0 text-mute transition-all duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bronze"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal
          delay={0.35}
          className="mt-16 flex justify-center"
        >
          <Button
            href="https://discord.gg/cryptolegalcommunity"
            variant="primary"
          >
            Join the Community
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
