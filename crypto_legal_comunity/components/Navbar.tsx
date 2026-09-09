"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";
import JoinDropdown from "@/components/JoinDropdown";
import Logo from "@/components/ui/Logo";
import SoundLink from "@/components/ui/SoundLink";
import { useSound } from "@/lib/sound/use-sound";
import { navLinks } from "@/lib/data";
import { sectionHref } from "@/lib/navigation";
import { editorialEase } from "@/lib/motion";

export default function Navbar() {
  const { play } = useSound();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      // Auto-hide on scroll down, reveal instantly on scroll up — classic
      // premium-chrome behavior. Only kicks in past the hero's first screen,
      // and never fights the mobile menu.
      const goingDown = y > lastY.current;
      const past = y > 160;
      if (!menuOpen) {
        setHidden(goingDown && past && Math.abs(y - lastY.current) > 4);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease: editorialEase }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled
          ? "border-b border-surface-2 bg-void/85 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        <a href={sectionHref("#top")} className="relative z-10" aria-label="Crypto Legal Community — home">
          <Logo />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navLinks
            .filter((link) => link.href !== "#contact")
            .map((link) => (
              <SoundLink
                key={link.href}
                href={sectionHref(link.href)}
                className="group relative py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mute transition-colors duration-300 hover:text-paper"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-bronze transition-all duration-300 ease-out group-hover:w-full" />
              </SoundLink>
            ))}

          <JoinDropdown variant="desktop" />

          <SoundLink
            href={sectionHref("#contact")}
            className="group relative py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mute transition-colors duration-300 hover:text-paper"
          >
            Contact
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-bronze transition-all duration-300 ease-out group-hover:w-full" />
          </SoundLink>
        </nav>

        <SoundLink
          href={sectionHref("#contact")}
          className="hidden border border-paper/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5 hover:border-bronze hover:text-bronze lg:inline-flex"
        >
          Join Community
        </SoundLink>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => {
            play("whoosh");
            setMenuOpen((v) => !v);
          }}
          className="relative z-10 inline-flex h-10 w-10 items-center justify-center text-paper transition-transform duration-300 hover:scale-105 active:scale-95 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: editorialEase }}
            className="border-b border-surface-2 bg-void lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={sectionHref(link.href)}
                  onClick={() => {
                    play("click");
                    setMenuOpen(false);
                  }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05, ease: editorialEase }}
                  className="border-b border-surface-2 py-4 font-display text-2xl text-paper"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.35,
                  delay: navLinks.length * 0.05,
                  ease: editorialEase,
                }}
                className="border-b border-surface-2 py-2"
              >
                <JoinDropdown variant="mobile" onNavigate={() => setMenuOpen(false)} />
              </motion.div>

              <a
                href={sectionHref("#contact")}
                onClick={() => {
                  play("click");
                  setMenuOpen(false);
                }}
                className="mt-6 border border-paper/25 px-5 py-3.5 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-paper"
              >
                Join Community
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
