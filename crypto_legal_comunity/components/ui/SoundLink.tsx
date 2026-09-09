"use client";

import type { ReactNode } from "react";
import { useSound } from "@/lib/sound/use-sound";

// ---------------------------------------------------------------------------
// SoundLink — drop-in <a> wrapper that plays the subtle "click" cue on
// navigation. Used on the links users actually click to go somewhere:
// nav items, footer links, dropdown entries, contact rows. Not a blanket
// sound on every anchor — just real navigation points.
// ---------------------------------------------------------------------------

type SoundLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  onClick?: () => void;
};

export default function SoundLink({
  href,
  children,
  className = "",
  target,
  rel,
  ariaLabel,
  onClick,
}: SoundLinkProps) {
  const { play } = useSound();

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onClick={() => {
        play("click");
        onClick?.();
      }}
      className={className}
    >
      {children}
    </a>
  );
}
