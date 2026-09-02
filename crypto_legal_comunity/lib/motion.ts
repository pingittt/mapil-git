import type { Transition, Variants } from "framer-motion";

// A single, deliberate easing curve used everywhere in the site so motion
// feels authored rather than default. No springs, no bounce, no overshoot.
export const editorialEase = [0.16, 1, 0.3, 1] as const;

export const revealTransition = (delay = 0): Transition => ({
  duration: 0.9,
  delay,
  ease: editorialEase,
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  show: { opacity: 1, scale: 1 },
};

export const staggerChildren = (stagger = 0.12, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

// Default viewport config for scroll-reveals: fire once, a little before
// the element is fully in view.
export const viewportOnce = { once: true, margin: "-80px 0px -80px 0px" };
