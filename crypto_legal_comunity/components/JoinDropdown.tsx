"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, User, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { editorialEase } from "@/lib/motion";
import { useSound } from "@/lib/sound/use-sound";

export type JoinDropdownVariant = "desktop" | "mobile";

type JoinDropdownProps = {
  variant: JoinDropdownVariant;
  onNavigate?: () => void;
};

export default function JoinDropdown({
  variant,
  onNavigate,
}: JoinDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { play } = useSound();

  const toggle = () => {
    setOpen((v) => {
      if (!v) play("whoosh");
      return !v;
    });
  };

  // Close on outside click (desktop) / escape.
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const isDesktop = variant === "desktop";

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => isDesktop && setOpen(true)}
      onMouseLeave={() => isDesktop && setOpen(false)}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        className="group inline-flex items-center gap-1.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mute transition-colors duration-300 hover:text-paper"
      >
        Join
        <ChevronDown
          aria-hidden="true"
          className={`h-3 w-3 transition-transform duration-300 ease-out ${
            open ? "rotate-180 text-bronze" : "group-hover:text-bronze"
          }`}
        />
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-bronze transition-all duration-300 ease-out group-hover:w-full" />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: editorialEase }}
            className={`${isDesktop ? "absolute left-0 top-full pt-3" : "relative"} w-64 origin-top-left`}
          >
            <div
              className={`${
                isDesktop
                  ? "border border-surface-2 bg-void/95 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-sm"
                  : "border border-surface-2 bg-surface"
              } overflow-hidden`}
            >
              <div className="border-b border-surface-2 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-mute">
                Join
              </div>

              <a
                role="menuitem"
                href="/join/member"
                onClick={() => {
                  play("click");
                  setOpen(false);
                  onNavigate?.();
                }}
                className="group/item flex items-center gap-3 px-4 py-3 transition-colors duration-200 hover:bg-surface-2"
              >
                <User
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-mute transition-all duration-200 group-hover/item:-translate-x-0.5 group-hover/item:text-bronze"
                />
                <span className="flex flex-col">
                  <span className="text-sm text-paper">Join sebagai Member</span>
                  <span className="text-xs text-mute">Daftar sebagai member</span>
                </span>
              </a>

              <a
                role="menuitem"
                href="/join/community"
                onClick={() => {
                  play("click");
                  setOpen(false);
                  onNavigate?.();
                }}
                className="group/item flex items-center gap-3 border-t border-surface-2 px-4 py-3 transition-colors duration-200 hover:bg-surface-2"
              >
                <Users
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-mute transition-all duration-200 group-hover/item:-translate-x-0.5 group-hover/item:text-bronze"
                />
                <span className="flex flex-col">
                  <span className="text-sm text-paper">Join Komunitas</span>
                  <span className="text-xs text-mute">Gabung via WhatsApp</span>
                </span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
