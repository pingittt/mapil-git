"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// CountUp — animates the numeric portion of a stat string ("50+": 0 → 50,
// then the suffix snaps back on). Fires once when scrolled into view.
// Honors prefers-reduced-motion (renders the final value immediately) and
// passes non-numeric values through untouched. The rendered value is derived
// during render; state is only written from the animation callbacks, so
// there are no cascading renders.
// ---------------------------------------------------------------------------

type CountUpProps = {
  value: string;
  className?: string;
  duration?: number;
};

export default function CountUp({
  value,
  className = "",
  duration = 1.4,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px -60px 0px" });
  const reduce = useReducedMotion();

  // The live value while the count runs; null before and after.
  const [animated, setAnimated] = useState<string | null>(null);

  const match = value.match(/^(\D*?)(\d[\d,.]*)(.*)$/);
  const numeric = match ? parseFloat(match[2].replace(/,/g, "")) : NaN;
  const prefix = match?.[1] ?? "";
  const suffix = match?.[3] ?? "";
  const canAnimate = Boolean(match) && Number.isFinite(numeric) && !reduce;

  useEffect(() => {
    if (!canAnimate || !inView) return;

    const controls = animate(0, numeric, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setAnimated(`${prefix}${Math.round(v)}${suffix}`),
      onComplete: () => setAnimated(null),
    });
    return () => controls.stop();
  }, [canAnimate, inView, numeric, duration, prefix, suffix]);

  // Derived display: counting value → pre-roll zero → final value.
  const display =
    animated ?? (canAnimate && !inView ? `${prefix}0${suffix}` : value);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
