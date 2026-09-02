"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { navLinks } from "@/lib/data";
import { editorialEase } from "@/lib/motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled
          ? "border-b border-surface-2 bg-void/85 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        <a href="#top" className="relative z-10" aria-label="Crypto Legal Community — home">
          <Logo />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mute transition-colors duration-300 hover:text-paper"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-bronze transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden border border-paper/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:border-bronze hover:text-bronze md:inline-flex"
        >
          Join Community
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-10 inline-flex h-10 w-10 items-center justify-center text-paper md:hidden"
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
            className="border-b border-surface-2 bg-void md:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05, ease: editorialEase }}
                  className="border-b border-surface-2 py-4 font-display text-2xl text-paper"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-6 border border-paper/25 px-5 py-3.5 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-paper"
              >
                Join Community
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
