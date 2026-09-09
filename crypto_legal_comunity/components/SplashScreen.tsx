"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { editorialEase } from "@/lib/motion";
import { useSound } from "@/lib/sound/use-sound";

const SESSION_KEY = "clc_splash_seen";
const INTRO_MS = 3200;

export default function SplashScreen() {
  const prefersReducedMotion = useReducedMotion();
  const { play } = useSound();
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const startedRef = useRef(false);

  // Hide the splash on repeat visits within the same tab session
  // ("sound/animation only when the web starts"). Hidden one frame in so
  // the very first paint still matches the server-rendered overlay without
  // a hydration mismatch.
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const raf = window.requestAnimationFrame(() => {
      let seen = false;
      try {
        seen = sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {
        /* ignore */
      }
      if (seen) setVisible(false);
    });

    return () => window.cancelAnimationFrame(raf);
  }, []);

  // Auto-dismiss timer.
  useEffect(() => {
    if (dismissed) return;
    const timer = window.setTimeout(() => setVisible(false), INTRO_MS);
    return () => window.clearTimeout(timer);
  }, [dismissed]);

  // Lock scrolling while the intro is on screen.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const prev = document.body.style.overflow;
    if (visible && !dismissed) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible, dismissed]);

  // Sound intentionally does NOT autoplay with the intro (browser autoplay
  // policies + the sound spec: nothing plays until the user interacts and
  // enables sound). The dismiss click below is a real interaction, so it may
  // play a subtle cue — and only when the user turned sound on.
  return (
    <AnimatePresence
      onExitComplete={() => {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* ignore */
        }
        {/* Re-mount the next time this tab loads the landing page so the
            site behind stays fully interactive once the intro has left. */}
        setDismissed(true);
      }}
    >
      {visible && (
        <motion.div
          key="splash"
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center bg-void"
          onClick={() => {
            play("click");
            setVisible(false);
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: editorialEase }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.1 : 0.9,
              ease: editorialEase,
              delay: 0.15,
            }}
            className="relative flex flex-col items-center"
          >
            <Image
              src="/image/logo2.png"
              alt=""
              width={206}
              height={336}
              priority
              sizes="206px"
              className="h-auto w-44 object-contain sm:w-52"
            />
          </motion.div>

          <motion.span
            aria-hidden="true"
            className="mt-8 h-px origin-center bg-bronze/60"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.05 : 0.8,
              ease: editorialEase,
              delay: 0.5,
            }}
            style={{ width: 160 }}
          />

          <motion.p
            className="mt-5 font-mono text-[10px] uppercase tracking-[0.4em] text-mute"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.1 : 0.7,
              ease: editorialEase,
              delay: 0.7,
            }}
          >
            Crypto Legal Community
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}