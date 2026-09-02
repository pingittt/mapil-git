import Logo from "@/components/ui/Logo";
import Container from "@/components/ui/Container";
import { navLinks, siteMeta } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-surface-2 bg-surface/40 pt-20">
      <Container>
        <div className="flex flex-col gap-14 pb-14 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-mute">
              {siteMeta.name}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.25em] text-mute/60">
              {siteMeta.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-3 sm:flex sm:flex-col sm:gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute transition-colors duration-300 hover:text-paper"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-surface-2 py-8 text-xs text-mute/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Crypto Legal Community. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.2em]">
            Built for the digital generation
          </p>
        </div>
      </Container>
    </footer>
  );
}
